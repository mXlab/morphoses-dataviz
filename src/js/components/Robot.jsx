import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import RobotWidget from './RobotWidget';

import EventManager from '../managers/EventManager';
import RobotTrail from './RobotTrail';

const Robot = (props, ref) => {
    // props
    const {
        // defaults
        color = "black",
        size = 20,

        // bools
        allowP5 = false,

        // the rest
        id, name,
    } = props;




    // states
    const [pos, setPos]                 = useState({ x: 0.5, y: 0.5 });
    const [mrz, setMrz]                 = useState(0);
    const [trail]                       = useState(new RobotTrail(color));
    const [trailing, setTrailing]       = useState(true);


    // hooks called from parent
    useImperativeHandle(ref, () => ({
        draw(p5, arenaSize) {
            const { map } = p5;

            // remap position on WebGL arena...
            const x = map(pos.x, 0, 1, -(arenaSize/2) + (size/2), (arenaSize/2) - (size/2));
            const y = map(pos.y, 1, 0, -(arenaSize/2) + (size/2), (arenaSize/2) - (size/2));

            // circle
            p5.push();
            p5.translate(x, y);

            p5.fill(color);
            p5.noStroke();
            p5.circle(0, 0, size);

            p5.pop();

            // draw trails
            trail.draw(p5, arenaSize, arenaSize);
        },

        renderCanvasTrail(ctx, width, height) {
            trail.render(ctx, width, height);
        }
    }));


    // mount hook
    useEffect(() => {
        // event handlers
        EventManager.plug(`${id} pos`, (pos) => {
            setPos(pos);

            if (trailing && trail) {
                trail.push(pos);
            }
        });

        EventManager.plug(`${id} mrot`, ({z:mrz}) => setMrz(mrz));
    }, [id]);// <---- only do this once!


    // render
    if (!allowP5) {
        return <RobotWidget
            key={id + '--widget'}
            pos={pos}
            color={color}
            mrz={mrz}
            size={size}
        />;
    }
    
    return <></>;
    
}

export default forwardRef(Robot);