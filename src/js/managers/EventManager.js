import io from 'socket.io-client';

import GraphManager from './GraphManager';
import RobotManager from './RobotManager';
import globals from '../globals';
import { parseCoords } from '../utils';

export default class EventManager {
    constructor() {
        // bindings
        this.setPosition = ::this.setPosition;
        this.setQuaternion = ::this.setQuaternion;
        this.setRotation = ::this.setRotation;
        this.setMotorQuaternion = ::this.setMotorQuaternion;
        this.setMotorRotation = ::this.setMotorRotation;
        this.setReward = ::this.setReward;
        this.setDistance = ::this.setDistance;
        this.setClose = ::this.setClose;
        this.setAngle = ::this.setAngle;
        this.setQuadrant = ::this.setQuadrant;

        this.flagDebug = false;

        // initialize socket
        this.socket = io();
        
        // define callbacks
        globals.TAGS.forEach(tag => {
            // -----******************-----
            // ---- ABSOLUTE TO ITSELF ----
            // -----******************-----
            this.socket.on(`${tag} pos`, this.setPosition);
            this.socket.on(`${tag} quat`, this.setQuaternion);
            this.socket.on(`${tag} rot`, this.setRotation);
            this.socket.on(`${tag} mquat`, this.setMotorQuaternion);
            this.socket.on(`${tag} mrot`, this.setMotorRotation);
            this.socket.on(`${tag} reward`, this.setReward);

            
            // -----************************-----
            // ---- RELATIVE TO OTHER BODIES ----
            // -----************************-----
            const otherTags = globals.TAGS.filter(t => t !== tag);
            otherTags.forEach(other => {
                this.socket.on(`${tag} close_${other}`, this.setClose);
                this.socket.on(`${tag} dist_${other}`, this.setDistance);
                this.socket.on(`${tag} angle_${other}`, this.setAngle);
                this.socket.on(`${tag} quadrant_${other}`, this.setQuadrant);
            });
        });
    }

    static init() {
        EventManager.instance = new EventManager();
    }

    static emit(evt, args) {
        EventManager.instance.socket.emit(evt, args);
    }


    // -----*********-----
    // ---- CALLBACKS ----
    // -----*********-----
    setPosition([robotID, pos]) {
        // TODO: make this a checkbox to show in a sidebar
        // patch this with an EventEmitter
        if (this.flagDebug)
            console.log(`${tag} pos\n${parseCoords(pos)}`);

        // get robot
        const r = RobotManager.get(robotID);
        if (!r) return;
        
        // set position
        r.setPosition(...pos);
    }

    setQuaternion([robotID, quat]) {
        if (this.flagDebug)
            console.log(`${tag} orientation\n${parseCoords(quat, "q")}`);
    
        // get robot
        const r = RobotManager.get(robotID);
        if (!r) return;

        // set quaternion orientation
        r.setOrientation(...quat);
    }

    setRotation([robotID, rot]) {
        if (this.flagDebug)
            console.log(`${tag} rotation\n${parseCoords(rot, "r")}`);
    }

    setMotorQuaternion([robotID, quat]) {
        if (this.flagDebug)
            console.log(`${tag} orientation (motor)\n${parseCoords(quat, "mq")}`);
    }

    setMotorRotation([robotID, rot]) {
        if (this.flagDebug)
            console.log(`${tag} rotation (motor)\n${parseCoords(rot, "mr")}`);
        
        // get robot
        const r = RobotManager.get(robotID);
        if (!r) return;

        // set rotation
        const mrz = rot[2];
        r.setDirection(mrz);
    }

    setReward([robotID, [reward]]) {
        // console.log();
        const g = GraphManager.get(`${robotID} reward`);
        if (!g) return;

        g.addValue(reward);
    }

    setDistance() {

    }

    setClose() {

    }

    setAngle() {

    }

    setQuadrant() {

    }
}