import React from 'react';


class Arena extends React.Component {
    constructor(props) {
        super(props);

        this.loop = ::this.loop;

        // ref creation
        this.trailsRef = React.createRef();
    }

    componentDidMount() {
        this.canvas = this.trailsRef.current;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        this.loop();

        this.props.onmount(this.canvas);
    }

    loop() {
        this.ctx.clearRect(0, 0, this.props.width, this.props.height);
        
        // UPDATE TRAILS? HOW???
        // retrieve them with the robots things
        const trails = this.getTrails();
        trails.forEach(trail => trail.render(this.ctx));
        

        this.reqID = requestAnimationFrame(this.loop);
    }

    getTrails() {
        return this.props.robots.map(r => r.getTrail());
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