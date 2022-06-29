// very similar to Graph except it fades over time
import CBuffer from "CBuffer";


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

    generatePoints(width, height) {
        let flatX = this.xs.toArray();
        // set to range
        flatX = flatX.map(x => x * (width - 10) + 5);
        // TODO: account for multiple lines separated by -1 values
        // remove -1 duplicates
        // flatX = flatX.filter((x,i) => x === -1 && x !== flatX[Math.max(i - 1, 0)]);

        let flatY = this.ys.toArray();
        flatY = flatY.map(y => (1 - y) * (height - 10) + 5);
        // flatY = flatY.filter((y,i) => y === -1 && y !== flatY[Math.max(i - 1, 0)]);

        // interleave
        return flatX.map((x, i) => [x, flatY[i]]);
    }

    // called in Arena.jsx
    render(ctx, width = 600, height = 600) {
        // get list of points
        const points = this.generatePoints(width, height);

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
        const points = this.generatePoints(width, height);
    }
}