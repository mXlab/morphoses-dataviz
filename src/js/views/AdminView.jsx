import React, { useState } from 'react';

import Arena from '../components/Arena';
import Controls from '../components/Controls';
import Robot from '../components/Robot';
import RobotTrail from '../components/RobotTrail';
import Panel from '../components/Panel';

class AdminView extends React.Component {
    constructor(props) {
        super(props);
            
        // bindings
        this.create = ::this.create;

        // states
        this.state = {
            panels: []
        };
    }

    componentDidMount() {
        const { registry } = this.props;

        for (let i = 0; i < registry.length; i++) {
            this.create(registry[i]);
        }
    }

    // renderer
    render() {
        // jsx render
        // TODO: improve hierarchy mgmt (it's a little wonky rn)
        return(
            <div className="viewer">
                <Arena registry={this.props.registry} width={600} height={600} />
                <Controls>{this.state.panels}</Controls>
            </div>
        );
    }

    create({id, name, color}) {
        const panel = <Panel key={id + '--panel'} id={id} name={name} color={color} />

        // add to previous ...
        this.setState(prevState => ({
            panels: [...prevState.panels, panel]
        }));
    }
}

export default AdminView;