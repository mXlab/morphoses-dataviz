import io from 'socket.io-client';

import globals from '../globals';
import GraphManager from '../managers/GraphManager';
import { parseCoords } from '../utils';

const flagDebug = false;

export default class EventRegister {
    static init() {
        // connect to socket.io
        EventRegister.socket = io();
        let _s = EventRegister.socket;

        // define callbacks
        globals.TAGS.forEach(tag => {
            // get DOM node
            let el = document.querySelector(`#${tag}`);

            
            // -----******************-----
            // ---- ABSOLUTE TO ITSELF ----
            // -----******************-----

            // position
            _s.on(`${tag} pos`, args => {
                // TODO: make this a checkbox to show in a sidebar
                // patch this with an EventEmitter
                if (flagDebug)
                    console.log(`${tag} pos\n${parseCoords(args)}`);

                const pos = { x: args[0], y: args[1] };

                // transform
                el.style.top = `${(1 - pos.y) * 100}%`;
                el.style.left = `${pos.x * 100}%`;
            });

            // orientation (quaternion)
            _s.on(`${tag} quat`, args => {
                if (flagDebug)
                    console.log(`${tag} orientation\n${parseCoords(args, "q")}`);
            });

            // rotation (euler)
            _s.on(`${tag} rot`, args => {
                if (flagDebug)
                    console.log(`${tag} rotation\n${parseCoords(args, "r")}`);
            });

            // motor orientation (quat)
            _s.on(`${tag} mquat`, args => {
                if (flagDebug)
                    console.log(`${tag} orientation (motor)\n${parseCoords(args, "mq")}`);
            });
            
            // motor rotation (euler)
            _s.on(`${tag} mrot`, args => {
                if (flagDebug)
                    console.log(`${tag} rotation (motor)\n${parseCoords(args, "mr")}`);
            });

            // TODO: reward
            // (graphed in its own component possibly)
            _s.on(`${tag} reward`, args => {
                // console.log();
                const g = GraphManager.get(`${tag} reward`);
                if (!g) return;

                g.addValue(args[0] * 50);
            });

            
            // -----************************-----
            // ---- RELATIVE TO OTHER BODIES ----
            // -----************************-----

            const otherTags = globals.TAGS.filter(t => t !== tag);
            otherTags.forEach(other => {
                // close (boolean)
                _s.on(`${tag} close_${other}`, args => {
                    // console.log(`${tag} close to ${other}`);
                });
                
                // distance
                _s.on(`${tag} dist_${other}`, args => {
                    // console.log()
                });

                // angle
                _s.on(`${tag} angle_${other}`, args => {
                    // console.log();
                });

                // quadrant
                _s.on(`${tag} quadrant_${other}`, args => {
                    // console.log();
                });
            });
        });
    }

    static emit(evt, args) {
        const _s = EventRegister.socket;
        _s.emit(evt, args);
    }
}