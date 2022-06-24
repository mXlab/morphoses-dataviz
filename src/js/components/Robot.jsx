import { Vector3, Quaternion } from "three";
import React from 'react';

import QuatWidget from "./QuatWidget";
import EventManager from '../managers/EventManager';
import RobotWidget from "./RobotWidget";

class Robot extends React.Component {
    constructor(props) {
        super(props);

        // bindings
        this.setPosition = ::this.setPosition;
        this.setDirection = ::this.setDirection;
        this.setOrientation = ::this.setOrientation;
        this.onClick = ::this.onClick;
        this.toggleControls = ::this.toggleControls;


        // states
        this.state = {
            pos: { x: 0.5, y: 0.5 },
            orientation: { x: 0, y: 0, z: 1, w: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            motorOrientation: { x: 0, y: 0, z: 1, w: 0 },
            motorRotation: { x: 0, y: 0, z: 0 },

            showControls: true,
            trailing: true,
            allowRender: true,
        };

        
        // side components
        //this.quatWidget = new QuatWidget();

        // plug events
        EventManager
            .plug(`${this.props.id} pos`, this.setPosition)
            //.plug(`${this.id} quat`, this.setOrientation)
            .plug(`${this.props.id} mrot`, this.setDirection);
    }

    // set position of robot
    // (where they are)
    setPosition(pos) {
        this.setState({ pos })

        if (this.state.trailing) {
            this.props.trail.push(pos);
        }
    }

    // set direction of robot
    // (where they are looking)
    setDirection({ z:mrz }) {
        this.setState(state => state.motorRotation.z = mrz);
    }

    // set quaternion
    setOrientation({ x:qx, y:qy, z:qz, w:qw }) {
        //const quaternion = new Quaternion();
        //quaternion.setFromAxisAngle(new Vector3(qx,qy,qz).normalize(), qw * Math.PI * 2);

        //this.quatWidget.setOrientation(quaternion);
    }

    toggleControls() {
        this.setState({ showControls: !this.state.showControls });
    }

    onClick(e) {
    }

    render() {
        return <RobotWidget
            key={this.props.id + '--widget'}
            pos={this.state.pos}
            color={this.props.color}
            mrz={this.state.motorRotation.z}
            size={this.props.size}
        />;
    }
}

Robot.defaultProps = {
    color: "black",
    size: 20
};

export default Robot;