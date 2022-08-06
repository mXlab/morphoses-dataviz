import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { map_range } from '../utils';

import BatterySVG from '../../assets/battery.svg';
import EventManager from '../managers/EventManager';

const Battery = ({ id, active, color }) => {
    // states
    // battery level is in volts (10V = DIED)
    const [batteryLevel, setBatteryLevel] = useState(10);

    // on mount
    useEffect(() => {
        EventManager.plug(`${id} battery`, setBatteryLevel);
    }, [id]);


    // render
    const className = classNames(
        "battery",
        { "battery--inactive": !active }
    );
    const toPercent = Math.max(0, Math.min(100, Math.round(map_range(batteryLevel, 10, 12.5, 0, 100))));

    return (
        <span className={className} title={`${batteryLevel.toFixed(1)}V`}>
            {active ? `${toPercent}%` : `N/A`}
            <BatterySVG style={{ color, "--level": toPercent / 100 }}></BatterySVG>
        </span>
    );
};

export default Battery;