import React, { forwardRef, useEffect, useRef, useState, createRef } from 'react';
import Robot from './Robot';
import Anchor from './Anchor';

const Arena = ({ width = 600, height = 600, registry, anchorData }, ref) => {
    // states
    const [robots, setRobots] = useState([]);
    const [anchors, setAnchors] = useState([]);
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


        // create anchors
        const tempAnchors = [];
        for (let i = 0; i < anchorData.length; i++) {
            const { x, y } = anchorData[i];

            const anchorRef = createRef();
            const anchor = <Anchor key={"anchor" + i} x={x} y={y} ref={anchorRef}></Anchor>;
            tempAnchors.push(anchor);
        }
        setAnchors(tempAnchors);        // only set it once...

        
        // create robots
        const tempRobots = [];
        for (let i = 0; i < registry.length; i++) {
            const {id, name, color} = registry[i];
            
            const robotRef = createRef();
            const robot = <Robot dimensions={dimensions} ref={robotRef} key={id} id={id} canvas={canvas} name={name} color={color} />;
            tempRobots.push(robot);
        }
        setRobots(tempRobots);      // only set it once...
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
        // this is the ideal technique for running functions off react components btw :3
        // attach an arbitrary ref to it and make sure its rendered, even if nothing is in it
        anchors.forEach(a => {
            a.ref.current?.draw(ctx, dimensions, width, height);
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
            {anchors}
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