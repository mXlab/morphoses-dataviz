import CBuffer from 'CBuffer';
import { SVG } from '@svgdotjs/svg.js';
import Spline from 'cubic-spline';

const ACCEL = 0.0001;
const DECEL = 0.0001;
const TOPSPEED = 0.0005;

class Graph {
    constructor(parent) {
        // TODO: width dependent
        // TODO: cubic spline.......... for coarse value updates
        this.parent = parent;
        
        // create circular buffers
        // one for each axis (x is the timestamp)
        this.buffer = new CBuffer(100);
        this.currY = 0.5;
        this.smoothY = 0.5;
        this.buffer.push(this.currY);

        // smoothing props
        this.velocity = 0;

        // props n flags
        this.domain = 1000;         // in milliseconds, scaled to width
        this.allowRender = true;

        // create svg
        this.svg = SVG().addTo(this.parent);
        this.render();
    }

    render() {
        // delta y (also equals distance since 1d)
        const deltaY = this.currY - this.smoothY;
        const decelDistance = Math.pow(this.velocity,2) / (DECEL * 2);

        if (Math.abs(deltaY) > decelDistance) {
            this.velocity = Math.min(this.velocity + ACCEL, TOPSPEED);
        } else {
            this.velocity = Math.max(this.velocity - DECEL, 0);
        }

        this.smoothY += this.velocity;
        
        this.buffer.push(this.smoothY);

        //return;
        const points = this.buffer.toArray().map((y, x) => [x, (1-y) * 50]);

        // clear and redraw
        this.svg.clear();
        this.svg.polyline(points)
            .fill('none')
            .stroke({ width: 1, color: 'red' });

        // rerender @ 60fps
        requestAnimationFrame(this.render.bind(this));
    }

    addValue(yPos) {
        // ready value for smoothing
        this.currY = yPos;

        console.log(this.currY, this.smoothY);
    }
}

export default Graph;