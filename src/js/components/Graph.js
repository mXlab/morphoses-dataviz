import CBuffer from 'CBuffer';
import { SVG } from '@svgdotjs/svg.js';
import anime from 'animejs';

const defaults = {
    width: 100,         // width of SVG
    height: 50,         // height of SVG
    domain: 10000,      // history in milliseconds
    smooth: 5,          // smooth value
}

class Graph {
    constructor(parent, opts = {}) {
        this.render = ::this.render;

        // TODO: width dependent
        // TODO: cubic spline.......... for coarse value updates
        this.parent = document.querySelector(parent);
        this.opts = Object.assign(defaults, opts);
        
        // create circular buffers
        // one for each axis (x is the timestamp)
        this.numPoints = this.opts.domain / 1000 * 60;
        this.buffer = new CBuffer(this.numPoints);
        this.currY = 0.5;
        this.smoothY = 0.5;
        this.buffer.push(this.currY);


        // props n flags
        this.allowRender = true;

        // create svg
        this.createCanvas();
        
        // render
        this.render();
    }

    createCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.opts.width * window.devicePixelRatio;
        this.canvas.height = this.opts.height * window.devicePixelRatio;
        this.canvas.style.width = `${this.opts.width}px`;
        this.canvas.style.height = `${this.opts.height}px`;
        this.parent.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    render() {
        // delta y (also equals distance since 1d)
        // complimented 
        this.smoothY += (this.currY - this.smoothY) / Math.max(this.opts.smooth, 1);
        this.buffer.push(this.smoothY);

        //return;
        const scaleX = this.opts.width / this.numPoints;
        const scaleY = this.opts.height;
        const points = this.buffer.toArray().map((y, x) => [x * scaleX, (1-y) * scaleY]);

        // clear and redraw
        this.ctx.clearRect(0, 0, this.opts.width, this.opts.height);
        this.ctx.strokeStyle = 'red';
        this.ctx.beginPath();
        for (let i = 0; i < this.numPoints; i++) {
            if (points[i] === undefined) break;
            this.ctx.lineTo(...points[i]);
        }
        this.ctx.stroke();

        // rerender @ 60fps
        requestAnimationFrame(this.render);
    }

    addValue(currY) {
        if (this.tween)
            this.tween.pause();
            
        this.tween = anime({
            targets: this,
            currY,
            duration: this.opts.smooth * 30,
            easing: 'easeInQuad'
        });
    }
}

export default Graph;