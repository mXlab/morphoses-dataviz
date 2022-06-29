// very similar to Graph except it fades over time
import CBuffer from "CBuffer";

import { BALL_SIZE } from '../utils/settings';


export default class RobotTrail {
    constructor(color = "black") {
        this.color = color;

        this.numPoints = 20 * 60;            // = 5 seconds
        this.xs = new CBuffer(this.numPoints);
        this.ys = new CBuffer(this.numPoints);

        this.trailing = true;
    }

    setTrailing(trailing) {
        this.trailing = trailing;
    }

    push({x, y}) {
        this.xs.push(x);
        this.ys.push(y);
    }

    generatePoints(width, height, density = 1) {
        let flatX = this.xs.toArray();
        // set to range
        flatX = flatX.map(x => x * (width - BALL_SIZE) + (BALL_SIZE/2)).filter((x, i) => (i % density === 0) || (i === flatX.length-1));
        // TODO: account for multiple lines separated by -1 values
        // remove -1 duplicates
        // flatX = flatX.filter((x,i) => x === -1 && x !== flatX[Math.max(i - 1, 0)]);

        let flatY = this.ys.toArray();
        flatY = flatY.map(y => (1 - y) * (height - BALL_SIZE) + BALL_SIZE/2).filter((y, i) => (i % density === 0) || (i === flatY.length-1));
        // flatY = flatY.filter((y,i) => y === -1 && y !== flatY[Math.max(i - 1, 0)]);

        // interleave
        return flatX.map((x, i) => [x, flatY[i]]);
    }

    // called in Arena.jsx
    render(ctx, width = 600, height = 600) {
        // get list of points
        const points = this.generatePoints(width, height, 1);

        // render in parent canvas
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let i = 0; i < this.numPoints; i++) {
            if (points[i] === undefined) break;
            ctx.lineTo(...points[i]);
        }
        ctx.stroke();
    }

    // called in VisualizerView.jsx
    draw(p5, width, height) {
        const points = this.generatePoints(width, height, 1);

        p5.stroke(this.color);
        p5.strokeWeight(5);

        p5.push();
        p5.translate((window.innerWidth/2) - (width/2), (window.innerHeight/2) - (height/2));

        p5.beginShape();
        points.forEach(([x, y]) => {
            p5.vertex( x, y );
        });
        p5.endShape();

        p5.pop();
    }
}