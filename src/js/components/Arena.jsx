import React from 'react';


class Arena extends React.Component {
    constructor(props) {
        super(props);

        this.loop = ::this.loop;

        // ref creation
        this.trailsRef = React.createRef();
    }

    componentDidMount() {
        // retrieve ref + 2d context
        this.canvas = this.trailsRef.current;
        this.ctx = this.canvas.getContext("2d");
        // resize context to compensate for pixel density (Retina)
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        // callback
        // in practice this tells the program that
        // we are ready to initialize the robot components
        // see App.jsx and main.jsx
        this.props.onmount(this.canvas);

        // start looping
        this.loop();
    }

    loop() {
        // clear canvas
        this.ctx.clearRect(0, 0, this.props.width, this.props.height);
        // render trails
        this.props.trails.forEach(trail => trail.render(this.ctx));
        // loop (60fps)
        this.reqID = requestAnimationFrame(this.loop);
    }
    
    render() {
        let canvasStyle = {
            width: this.props.width + 'px',
            height: this.props.height + 'px',
        };

        return (
            <div className="arena">
                {this.props.children}
                <canvas
                    className="trails"
                    width={this.props.width * window.devicePixelRatio}
                    height={this.props.height * window.devicePixelRatio}
                    style={canvasStyle}
                    ref={this.trailsRef}
                ></canvas>
            </div>
        )
    }
}

export default Arena;