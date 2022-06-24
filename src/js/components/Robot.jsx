import { Vector3, Quaternion } from "three";
import React from 'react';

import QuatWidget from "./QuatWidget";
import RobotTrail from "./RobotTrail";
import Panel from './Panel';
import EventManager from '../managers/EventManager';
import RobotWidget from "./RobotWidget";

class Robot {
    constructor(id, canvas, name, color = "black") {
        // bindings
        this.setPosition = ::this.setPosition;
        this.setDirection = ::this.setDirection;
        this.setOrientation = ::this.setOrientation;
        this.onClick = ::this.onClick;
        this.setVisibility = ::this.setVisibility;

        this.id = id;
        this.canvas = canvas;
        this.name = name;
        this.color = color;
        this.visible = true;

        // more props
        this.allowRender = true;
        this.trailing = true;
        this.size = 20;             // diameter

        // data
        this.pos = { x: 0.5, y: 0.5 };
        this.orientation = { x: 0, y: 0, z: 1, w: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.motorOrientation = { x: 0, y: 0, z: 1, w: 0 };
        this.motorRotation = { x: 0, y: 0, z: 0 };

        // side components
        //this.quatWidget = new QuatWidget();
        this.trail = new RobotTrail(
            this.canvas.width / devicePixelRatio,
            this.canvas.height / devicePixelRatio,
            this.color
        );

        // plug events
        EventManager
            .plug(`${this.id} pos`, this.setPosition)
            //.plug(`${this.id} quat`, this.setOrientation)
            .plug(`${this.id} mrot`, this.setDirection);
    }

    // set position of robot
    // (where they are)
    setPosition({ x, y }) {
        this.pos = { x, y };

        if (this.trailing) {
            this.trail.push(this.pos);
        }
    }

    // set direction of robot
    // (where they are looking)
    setDirection({ z:mrz }) {
        this.motorRotation.z = mrz;
    }

    // set quaternion
    setOrientation({ x:qx, y:qy, z:qz, w:qw }) {
        const quaternion = new Quaternion();
        quaternion.setFromAxisAngle(new Vector3(qx,qy,qz).normalize(), qw * Math.PI * 2);

        this.quatWidget.setOrientation(quaternion);
    }

    setVisibility() {
        this.visible = !this.visible;
    }

    onClick(e) {
    }

    getPanel() {
        return <Panel key={this.id + '--panel'} id={this.id} name={this.name} color={this.color} />;
    }

    getWidget() {
        return <RobotWidget
            key={this.id + '--widget'}
            pos={this.pos}
            color={this.color}
            mrz={this.motorRotation.z}
            size={this.size}
        />
    }

    getTrail() {
        return this.trail;
    }
}

export default Robot;