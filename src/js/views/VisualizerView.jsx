import React, { useState, useEffect, createRef } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import { BALL_SIZE } from '../utils/settings';

import Robot from '../components/Robot';
import RobotTrail from '../components/RobotTrail';

const VisualizerView = props => {
    const { registry } = props;

    const [robots, setRobots] = useState([]);
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
        if (!robots.length) return;

        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight);

            // stroke settings
            p5.strokeCap(p5.ROUND);
            p5.strokeJoin(p5.ROUND);
        };

        p5.draw = () => {
            p5.background(0);

            // arena frame
            const size = Math.min(window.innerWidth, window.innerHeight) - BALL_SIZE;
            const rect = {
                x: (window.innerWidth / 2) - (size / 2),
                y: (window.innerHeight / 2) - (size / 2),
                w: size,
                h: size
            };

            p5.strokeWeight(1);
            p5.stroke("white");
            p5.noFill();
            p5.rect(rect.x, rect.y, rect.w, rect.h);


            // robot widgets
            robotRefs.forEach(({current:r}) => r.draw(p5, size));
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