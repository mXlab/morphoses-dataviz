import React, { useCallback, useState } from 'react';
import EventManager from '../managers/EventManager';
import CogSVG from '../../assets/cog.svg';

const CalibrateButton = ({ id }) => {
    // STATES:
    // 0 = BEGIN
    // 1 = SAVE
    // 2 = END
    const [calState, setCalState] = useState(0);

    const triggerCalibrate = useCallback(e => {
        EventManager.emit("calibrate", { id, calState });
        e.currentTarget.blur();
    }, []);

    return (
        <button className="icon-button icon-button--calibrate" onClick={triggerCalibrate}>
            <CogSVG></CogSVG>
        </button>
    );
};

export default CalibrateButton;