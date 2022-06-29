import React, { forwardRef, useEffect, useRef, useState, createRef } from 'react';

import Robot from './Robot';

const Arena = (props, ref) => {
    // props
    const { width = 600, height = 600, registry } = props;

    // states
    const [robots, setRobots] = useState([]);
    const [robotRefs, setRobotRefs] = useState([]);
    const [canvas, setCanvas] = useState();
    const [ctx, setCtx] = useState();
    
    // refs
    const trailsRef = useRef();


    // mount hook
    useEffect(() => {
        // create canvas
        setCanvas(trailsRef.current);
        setCtx(trailsRef.current.getContext("2d"));

        
        // create robots
        for (let i = 0; i < registry.length; i++) {
            const {id, name, color} = registry[i];
            
            const robotRef = createRef();
            const robot = <Robot ref={robotRef} key={id} id={id} canvas={canvas} name={name} color={color} />;
        
            setRobots(oldRobots => [...oldRobots, robot]);
            setRobotRefs(oldRefs => [...oldRefs, robotRef]);
        }
    }, [registry]);


    // canvas resizer (for pixel density)
    useEffect(() => {
        if (!ctx) return;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }, [ctx]);
    
    // loop trigger watch
    useEffect(() => {
        if (robots.length > 0) {
            // start canvas loop
            loop();
        }
    }, [robots]);


    function loop() {
        ctx.clearRect(0,0,width,height);
        robotRefs.forEach(({current:robot}) => robot.renderCanvasTrail(ctx, width, height));
        
        requestAnimationFrame(loop);
    }


    // render
    const canvasStyle = {
        width: width + 'px',
        height: height + 'px',
    };

    return (
        <div className="arena">
            {robots}
            <canvas
                className="trails"
                width={width * window.devicePixelRatio}
                height={height * window.devicePixelRatio}
                style={canvasStyle}
                ref={trailsRef}
            ></canvas>
        </div>
    )
};

export default forwardRef(Arena);