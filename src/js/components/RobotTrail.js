// very similar to Graph except it fades over time
import CBuffer from "CBuffer";
import { SVG } from '@svgdotjs/svg.js';


export default class RobotTrail {
    constructor(color = "black") {
        this.numPoints = 20 * 60;            // = 5 seconds
        
        this.xs = new CBuffer(this.numPoints);
        this.ys = new CBuffer(this.numPoints);

        this.color = color;
        this.trailing = true;

        // create svg
        this.svg = SVG().size(300, 300).addTo('.viewer').addClass("robot__trail");
    }

    setTrailing(trailing) {
        this.trailing = trailing;
    }

    push(pos) {
        this.xs.push(pos.x);
        this.ys.push(pos.y);
    }

    render() {
        if (!this.trailing) {
            this.xs.push(-1);
            this.ys.push(-1);
        }

        let flatX = this.xs.toArray();
        // set to range
        flatX = flatX.map(x => x * 290 + 5);
        // TODO: account for multiple lines separated by -1 values
        // remove -1 duplicates
        // flatX = flatX.filter((x,i) => x === -1 && x !== flatX[Math.max(i - 1, 0)]);

        let flatY = this.ys.toArray();
        flatY = flatY.map(y => (1 - y) * 290 + 5);
        // flatY = flatY.filter((y,i) => y === -1 && y !== flatY[Math.max(i - 1, 0)]);

        // interleave
        const points = flatX.map((x, i) => [x, flatY[i]]);

        this.svg.clear();
        this.svg.polyline(points).fill("none").stroke({ width: 0.5, color: this.color });
    }
}