import React from 'react';
import WidgetSVG from '../../assets/robot_widget.svg';

const RobotWidget = ({color, pos, mrz}) => {
    const containerStyle = {
        color: color,
        transform: `translate3d(${pos.x * 100}%, ${(1 - pos.y) * 100}%, 1px)`
    };
    const widgetStyle = {
        color: color,
        transform: `translate(-50%, -50%) rotate(${(((1 - mrz) * 360) + 90) % 360}deg)`
    };

    return (
        <>
            <div className="robot__container" style={containerStyle}>
                <button style={widgetStyle}><WidgetSVG></WidgetSVG></button>
            </div>
        </>
    )
};

export default RobotWidget;