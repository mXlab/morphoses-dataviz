import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import BatterySVG from '../../assets/battery.svg';

import EventManager from '../managers/EventManager';

const Battery = (props) => {
    // props
    const {
        id,
        active,
        color
    } = props;

    // states
    const [batteryLevel, setBatteryLevel] = useState(0);

    // on mount
    useEffect(() => {
        EventManager.plug(`${id} battery`, setBatteryLevel);
    }, [id]);


    // render
    const className = classNames(
        "battery",
        { "battery--active": active }
    );

    return (
        <span className={className}>
            {batteryLevel}%
            <BatterySVG style={{ color, "--level": batteryLevel/100 }}></BatterySVG>
        </span>
    );
};

export default Battery;