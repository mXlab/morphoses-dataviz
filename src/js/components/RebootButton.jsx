import React, { useCallback } from 'react';
import EventManager from '../managers/EventManager';
import PowerIconSVG from '../../assets/power_icon.svg';

const RebootButton = ({ id }) => {
    const triggerReboot = useCallback(e => {
        EventManager.emit("reboot", id);
        e.currentTarget.blur();
    }, []);

    return (
        <button className="reboot-button" onClick={triggerReboot}>
            <PowerIconSVG></PowerIconSVG>
        </button>
    );
};

export default RebootButton;