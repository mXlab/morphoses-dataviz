import React, { forwardRef, useEffect, useImperativeHandle, useReducer, useState } from 'react';
import EventManager from '../managers/EventManager';
import RobotTrail from './RobotTrail';
import Lop from './Lop';
import WidgetSVG from '../../assets/robot_widget.svg';
import { map_range } from '../utils';

const Robot = ({
    id, name, dimensions,
    color = "black", size = 20,
    allowP5 = false
}, ref) => {
    // reducer
    const reducer = (oldValue, newValue) => newValue;
    // states
    const [posX, setPosX]               = useReducer(reducer, 0);
    const [posY, setPosY]               = useReducer(reducer, 0);
    const [mrz,  setMrz]                = useReducer(reducer, 0);
    // lops
    const [lopX]                        = useState(() => new Lop(500, 0));
    const [lopY]                        = useState(() => new Lop(500, 0));
    const [lopMrz]                      = useState(() => new Lop(500, 0));
    // trail stuff
    const [trail]                       = useState(new RobotTrail(color));
    const [trailing, setTrailing]       = useState(true);


    // hooks called from parent
    useImperativeHandle(ref, () => ({
        draw(p5, arenaSize) {
            // remap position on WebGL arena...
            const x = p5.map(posX, 0, 1, (-arenaSize/2) + (size/2), (arenaSize/2) - (size/2));
            const y = p5.map(posY, 1, 0, (-arenaSize/2) + (size/2), (arenaSize/2) - (size/2));

            // circle
            p5.push();
            p5.translate(window.innerWidth / 2, window.innerHeight / 2);

            p5.fill(color);
            p5.noStroke();
            p5.circle(x, y, size);

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
        EventManager.plug(`${id} pos`, ({x, y}) => {
            lopX.set(x);
            lopY.set(y);

            if (trailing && trail) {
                // trail.push(pos);
            }
        });

        EventManager.plug(`${id} mrot`, ({z:mrz}) => {
            lopMrz.set(mrz);
        });
        
        lopX.setCallback(setPosX);
        lopY.setCallback(setPosY);
        lopMrz.setCallback(setMrz);
    }, [id]);// <---- only do this once!


    // render
    if (!allowP5) {
        const trX = map_range(posX, dimensions.minX, dimensions.maxX, 0, 100);
        const trY = map_range(posY, dimensions.minY, dimensions.maxY, 100, 0);      // y inverted because webstack :/

        const containerStyle = {
            color: color,
            transform: `translate3d(${trX}%, ${trY}%, 1px)`
        };
        const widgetStyle = {
            color: color,
            transform: `translate(-50%, -50%) rotate(${((360 - mrz) + 90) % 360}deg)`
        };

        return (
            <div className="robot__container" style={containerStyle}>
                <button style={widgetStyle}><WidgetSVG></WidgetSVG></button>
            </div>
        );
    }
    
    // dummy render
    return <></>;
    
}

export default forwardRef(Robot);