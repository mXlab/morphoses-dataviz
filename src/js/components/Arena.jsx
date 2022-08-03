import React, { forwardRef, useEffect, useRef, useState, createRef } from 'react';
import { map_range } from '../utils';
import Robot from './Robot';

const Arena = ({ width = 600, height = 600, registry, anchorData }, ref) => {
    // states
    const [robots, setRobots] = useState([]);
    const [robotRefs, setRobotRefs] = useState([]);
    const [canvas, setCanvas] = useState();
    const [ctx, setCtx] = useState();
    const [dimensions, setDimensions] = useState({});
    
    // refs
    const trailsRef = useRef();


    // mount hook
    useEffect(() => {
        // create canvas
        setCanvas(trailsRef.current);
        setCtx(trailsRef.current.getContext("2d"));


        // calculate dimensions
        let minX=0, maxX=0, minY=0, maxY=0;
        anchorData.forEach(({x, y}) => {
            if (x<minX) minX = x;
            if (x>maxX) maxX = x;
            if (y<minY) minY = y;
            if (y>maxY) maxY = y;
        });
        minX -= 0.5;
        maxX += 0.5;
        minY -= 0.5;
        maxY += 0.5;
        const dimensions = { minX, maxX, minY, maxY };
        setDimensions(dimensions);

        
        // create robots
        for (let i = 0; i < registry.length; i++) {
            const {id, name, color} = registry[i];
            
            const robotRef = createRef();
            const robot = <Robot dimensions={dimensions} ref={robotRef} key={id} id={id} canvas={canvas} name={name} color={color} />;
        
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
        ctx.fillStyle = "transparent";
        ctx.clearRect(0,0,width,height);
        // robotRefs.forEach(({current:robot}) => robot.renderCanvasTrail(ctx, width, height));

        // anchors
        ctx.fillStyle = "lightblue";
        anchorData.forEach(({ x, y }) => {
            ctx.beginPath();
            ctx.arc(
                map_range(x, dimensions.minX, dimensions.maxX, 0, width),
                map_range(y, dimensions.minY, dimensions.maxY, height, 0),
                4, 0, Math.PI * 2
            );
            ctx.fill();
        });
        
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