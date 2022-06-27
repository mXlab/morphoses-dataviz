import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.sketch = ::this.sketch;


    }

    create(id, name, color) {

    }

    sketch(p5) {
        p5.setup = this.setup.bind(p5);
        p5.draw = this.draw.bind(p5);
    }

    setup() {
        const p5 = this;
        p5.createCanvas(600, 400, p5.WEBGL);
    }

    draw() {
        const p5 = this;
        p5.background(100);
    }

    render() {
        return (
            <ReactP5Wrapper sketch={this.sketch}></ReactP5Wrapper>
        )
    }
}

export default Visualizer;