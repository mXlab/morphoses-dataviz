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
        this.buffer.push(this.currY);
    }

    points() {
        const scaleX = this.width / this.numPoints;
        const scaleY = this.height;

        const points = this.buffer.toArray().map((y, x) => [
            x * scaleX,
            map_range(y, this.range.max, this.range.min, 0, scaleY)
        ]);

        return points;
    }

    setRange(newRange) {
        this.range = newRange;
    }

    addValue(currY) {
        this.currY = currY;
    }

    size() {
        return this.numPoints;
    }
}

export default GraphBuffer;