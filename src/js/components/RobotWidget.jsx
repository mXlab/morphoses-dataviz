import React from 'react';

class RobotWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const containerStyle = {
            color: this.props.color,
            transform: `translate3d(${this.props.pos.x * 100}%, ${(1 - this.props.pos.y) * 100}%, 1px)`
        };
        const widgetStyle = {
            width: this.props.size,
            height: this.props.size,
            color: this.props.color,
            transform: `translate(-50%, -50%) rotate(${(((1 - this.props.mrz) * 360) + 90) % 360}deg)`
        };

        return (
            <>
                <div className="robot__container" style={containerStyle}>
                    <button style={widgetStyle} onClick={this.props.onClick} className="robot"></button>
                </div>
                <div className="control"></div>
            </>
        )
    }
}

export default RobotWidget;