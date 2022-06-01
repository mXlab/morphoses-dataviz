import io from 'socket.io-client';

import { parseCoords } from '../utils';

const NUM_ROBOTS = 3;
const flagDebug = true;

export default class EventRegister {
    static Init() {
        // connect to socket.io
        EventRegister.socket = io();
        let _s = EventRegister.socket;

        // define callbacks
        for (let i = 0; i <= NUM_ROBOTS; ++i) {
            let tag = `robot${i}`;
            let el = document.querySelector(`#${tag}`);

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
        }
    }

    static Emit(evt, args) {
        const _s = EventRegister.socket;
        _s.emit(evt, args);
    }
}