import React, { useCallback, useState } from 'react';
import EventManager from '../managers/EventManager';
import PowerIconSVG from '../../assets/power_icon.svg';

const PowerButton = ({ id, initActive = false }, ref) => {
    const [poweredOn, setPoweredOn] = useState(initActive);
    
    const triggerReboot = useCallback(e => {
        EventManager.emit("reboot", id);
        e.currentTarget.blur();
    }, []);

    return (
        <button className="icon-button icon-button--reboot" onClick={triggerReboot}>
            <PowerIconSVG></PowerIconSVG>
        </button>
    );
};

export default PowerButton;