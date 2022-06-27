import React from 'react';

import Arena from '../components/Arena';
import Controls from '../components/Controls';
import Robot from '../components/Robot';
import RobotTrail from '../components/RobotTrail';
import Panel from '../components/Panel';

class AdminView extends React.Component {
    constructor(props) {
        super(props);
            
        // bindings
        this.arenaMounted = ::this.arenaMounted;

        // states
        this.state = {
            robots: [],
            trails: [],
            panels: []
        };
    }

    arenaMounted(canvas) {
        this.trailCanvas = canvas;

        // now that we have the trail canvas rendered...
        // we can create the robots!!!
        // refer to main.jsx for create() calls
        this.props.onmount(this);
    }

    // renderer
    render() {
        // jsx render
        // TODO: improve hierarchy mgmt (it's a little wonky rn)
        return(
            <>
                <Arena trails={this.state.trails} onmount={this.arenaMounted} width="600" height="600">{this.state.robots}</Arena>
                <Controls>{this.state.panels}</Controls>
            </>
        );
    }

    create(id, name, color) {
        if (id in this.state.robots) return;

        const width = this.trailCanvas.width / devicePixelRatio;
        const height = this.trailCanvas.height / devicePixelRatio;

        const trail = new RobotTrail(width, height, color);
        const panel = <Panel key={id + '--panel'} id={id} name={name} color={color} />
        const robot = <Robot key={id} trail={trail} id={id} canvas={this.trailCanvas} name={name} color={color} />;

        // add to previous ...
        this.setState(prevState => ({
            robots: [...prevState.robots, robot],
            trails: [...prevState.trails, trail],
            panels: [...prevState.panels, panel]
        }));
    }
}

export default AdminView;