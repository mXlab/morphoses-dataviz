import CBuffer from 'CBuffer';
import anime from 'animejs';
import { map_range } from '../utils';

class GraphBuffer {
    constructor({ domain, width, height, smooth, range, initialValue }) {
        this.domain = domain;
        this.width = width;
        this.height = height;
        this.smooth = smooth;
        this.range = range;

        this.numPoints = this.domain / 1000 * 60;
        this.buffer = new CBuffer(this.numPoints);
        this.currY = initialValue;
        this.smoothY = initialValue;
        this.buffer.push(this.currY);
    }

    update() {
        this.smoothY += (this.currY - this.smoothY) / Math.max(this.smooth, 1);
        this.buffer.push(this.smoothY);
    }

    points() {
        const scaleX = this.width / this.numPoints;
        const scaleY = this.height;

        const points = this.buffer.toArray().map((y, x) => [
            x * scaleX,
            map_range(1 - y, this.range.min, this.range.max, 0, scaleY)
        ]);

        return points;
    }

    addValue(currY) {
        if (this.tween)
            this.tween.pause();
            
        this.tween = anime({
            targets: this,
            currY,
            duration: this.smooth * 30,
            easing: 'easeInQuad'
        });
    }

    size() {
        return this.numPoints;
    }
}

export default GraphBuffer;