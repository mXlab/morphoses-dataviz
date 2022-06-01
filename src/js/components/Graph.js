import CBuffer from 'CBuffer';
import { SVG } from '@svgdotjs/svg.js';
import Spline from 'cubic-spline';

class Graph {
    constructor(parent) {
        // TODO: width dependent
        // TODO: cubic spline.......... for coarse value updates
        this.parent = parent;
        
        this.buffer = new CBuffer(100);
        this.allowRender = true;

        this.svg = SVG().addTo(this.parent);
        this.render();
    }

    render() {
        // build graph from circular buffer
        const points = this.buffer.toArray().map((x, i) => [i*2, x]);

        // clear and redraw
        this.svg.clear();
        this.svg.polyline(points)
            .fill('none')
            .stroke({ width: 1, color: 'red' });
    }

    addValue(yPos) {
        // push y value in buffer
        this.buffer.push(yPos);

        // redraw immediately
        // TODO: what if the values are stalled?
        if (this.allowRender)
            this.render();
    }
}

export default Graph;