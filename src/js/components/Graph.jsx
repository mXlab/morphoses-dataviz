import React from "react";
import GraphBuffer from "./GraphBuffer";

class Graph extends React.Component {
    constructor(props) {
        super(props);

        // bindings
        this.update = ::this.update;

        // ref creation
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        // WE ONLY RETRIEVE CONTEXT ONCE THE COMPONENT HAS BEEN MOUNTED
        // OTHERWISE THE REFERENCE TO THE CANVAS NODE DOESNT EXIST
        this.canvas = this.canvasRef.current;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        // buffer
        this.buffer = new GraphBuffer(this.props);
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.reqID);
        this.reqID = null;
    }

    render() {
        const canvasStyle = {
            width: this.props.width,
            height: this.props.height
        };

        // request update on render
        if (!this.reqID)
            this.reqID = requestAnimationFrame(this.update);

        return (
            <div className="graph" style={canvasStyle}>
                <canvas
                    width={this.props.width * window.devicePixelRatio}
                    height={this.props.height * window.devicePixelRatio}
                    ref={this.canvasRef}
                ></canvas>
            </div>
        )
    }

    update() {
        // update buffer state
        this.buffer.update();
        // get points from buffer...
        const points = this.buffer.points();

        // clear and redraw
        this.ctx.clearRect(0, 0, this.props.width, this.props.height);
        this.ctx.strokeStyle = 'red';
        this.ctx.beginPath();

        for (let i = 0; i < this.buffer.size(); i++) {
            if (points[i] === undefined) break;
            this.ctx.lineTo(...points[i]);
        }
        this.ctx.stroke();

        // rerender @ 60fps
        this.reqID = requestAnimationFrame(this.update);
    }

    addValue(currY) {
        this.buffer.addValue(currY);
    }
}

Graph.defaultProps = {
    width: 135,                     // width of SVG
    height: 35,                     // height of SVG
    domain: 10000,                  // history in milliseconds
    range: { min: 0, max: 1 },      // vertical/horizontal range
    smooth: 0,                      // smooth value
};

export default Graph;