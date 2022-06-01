import io from 'socket.io-client';

import { parseCoords } from '../utils';

const NUM_ROBOTS = 3;

export default class EventRegister {
    static Init() {
        // connect to socket.io
        EventRegister.socket = io();
        let _s = EventRegister.socket;

        // define callbacks
        for (let i = 0; i <= NUM_ROBOTS; ++i) {
            let tag = `robot${i}`;

            // position
            _s.on(`${tag} pos`, args => {
                console.log(`${tag} pos\n${parseCoords(args)}`);
            });

            // orientation (quaternion)
            _s.on(`${tag} quat`, args => {
                console.log(`${tag} orientation\n${parseCoords(args, "q")}`);
            });

            // rotation (euler)
            _s.on(`${tag} rot`, args => {
                console.log(`${tag} rotation\n${parseCoords(args, "r")}`);
            });

            // motor orientation (quat)
            _s.on(`${tag} mquat`, args => {
                console.log(`${tag} orientation (motor)\n${parseCoords(args, "mq")}`);
            });
            
            // motor rotation (euler)
            _s.on(`${tag} mrot`, args => {
                console.log(`${tag} rotation (motor)\n${parseCoords(args, "mr")}`);
            });
        }
    }
}