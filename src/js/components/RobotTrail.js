// very similar to Graph except it fades over time
import CBuffer from "CBuffer";


export default class RobotTrail {
    constructor(width = 600, height = 600, color = "black") {
        this.color = color;

        this.width = width;
        this.height = height;

        this.numPoints = 20 * 60;            // = 5 seconds
        this.xs = new CBuffer(this.numPoints);
        this.ys = new CBuffer(this.numPoints);

        this.trailing = true;
    }

    setTrailing(trailing) {
        this.trailing = trailing;
    }

    push(pos) {
        this.xs.push(pos.x);
        this.ys.push(pos.y);
    }

    // called in parent Robot component
    render(ctx) {
        if (!this.trailing) {
            this.xs.push(-1);
            this.ys.push(-1);
        }

        let flatX = this.xs.toArray();
        // set to range
        flatX = flatX.map(x => x * (this.width - 10) + 5);
        // TODO: account for multiple lines separated by -1 values
        // remove -1 duplicates
        // flatX = flatX.filter((x,i) => x === -1 && x !== flatX[Math.max(i - 1, 0)]);

        let flatY = this.ys.toArray();
        flatY = flatY.map(y => (1 - y) * (this.height - 10) + 5);
        // flatY = flatY.filter((y,i) => y === -1 && y !== flatY[Math.max(i - 1, 0)]);

        // interleave
        const points = flatX.map((x, i) => [x, flatY[i]]);

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
}