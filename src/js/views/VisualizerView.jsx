import React, { useState, useEffect, forwardRef, createRef } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import Robot from '../components/Robot';
import RobotTrail from '../components/RobotTrail';

const VisualizerView = props => {
    const { registry } = props;

    const [robots, setRobots] = useState([]);
    const [trails, setTrails] = useState([]);
    const [robotRefs, setRobotRefs] = useState([]);


    // mount hook
    useEffect(() => {
        // create robots from registry
        registry.forEach(createRobot);
    }, [registry]);


    function createRobot({id, name, color}) {
        const newRef = createRef();
        const trail = new RobotTrail(color);
        const newRobot = <Robot ref={newRef} trail={trail} key={id} id={id} allowP5 name={name} color={color} />

        // set states
        setRobots(arr => [...arr, newRobot]);
        setRobotRefs(arr => [...arr, newRef]);
    }


    // p5
    const sketch = p5 => {
        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
        };

        p5.draw = () => {
            p5.background(0);

            // arena frame
            const arenaSize = Math.min(window.innerWidth, window.innerHeight) - 20;
            const rect = {
                x: -arenaSize / 2,
                y: -arenaSize / 2,
                w: arenaSize,
                h: arenaSize
            };

            p5.stroke("white");
            p5.noFill();
            p5.rect(rect.x, rect.y, rect.w, rect.h);


            // robot widgets
            robotRefs.forEach(({current:r}, i) => r.draw(p5, arenaSize));
        };
    };

    return (
        <>
            <div className="dummy">{robots}</div>
            <ReactP5Wrapper sketch={sketch} />
        </>
    )
};

export default VisualizerView;