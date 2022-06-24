import React from 'react';

import Arena from './Arena';
import Controls from './Controls';
import Robot from './Robot';

class App extends React.Component {
    constructor(props) {
        super(props);
            
        // bindings
        this.loop = ::this.loop;
        this.arenaMounted = ::this.arenaMounted;

        this.state = {
            robots: []
        };
    }

    arenaMounted(canvas) {
        this.trailCanvas = canvas;

        // now that we have the trail canvas rendered...
        // we can create the robots!
        this.props.createRobots(this);
    }

    loop() {
        // for (let r in this.robots)
        //     this.robots[r].render();

        // loop!
        requestAnimationFrame(this.loop);
    }

    getPanels() {
        return this.state.robots.map(r => r.getPanel());
    }

    getWidgets() {
        return this.state.robots.map(r => r.getWidget());
    }

    getTrails() {
        return this.state.robots.map(r => r.getTrail());
    }

    render() {
        const panels = this.getPanels();
        const widgets = this.getWidgets();
            
        // jsx render
        // TODO: improve hierarchy mgmt (it's a little wonky rn)
        return(
            <>
                <Arena robots={this.state.robots} onmount={this.arenaMounted} width="600" height="600">{widgets}</Arena>
                <Controls>{panels}</Controls>
            </>
        );
    }

    create(id, name, color) {
        if (id in this.state.robots) return;

        // this.robots[id] = new Robot(id, this.trailCanvas, name, color);
        this.setState(prevState => ({
            robots: [...prevState.robots, new Robot(id, this.trailCanvas, name, color)]
        }));
    }

    get(id) {
        if (!(id in this.robots)) return;
        return this.robots[id];
    }
}

export default App;