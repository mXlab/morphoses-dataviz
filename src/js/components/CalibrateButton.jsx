import React, { useCallback, useState } from 'react';
import { useTimer } from 'use-timer';
import EventManager from '../managers/EventManager';
import CogSVG from '../../assets/cog.svg';
import classNames from 'classnames';

const CalibrateButton = ({ id }) => {
    // STATES:
    // 0 = IDLE
    // 1 = CALIBRATING
    const [calState, setCalState] = useState(0);

    // ACTIONS:
    // 0 = BEGIN
    // 1 = SAVE
    // 2 = END

    const { time, start: tStart, reset: tReset, pause: tPause } = useTimer({
        autostart: false,
        initialTime: 0,
        endTime: 7,
        interval: 50,
    });

    /**
     * Begin, save or end depending on action
     */
    const triggerCalibrate = useCallback(e => {
        let action;

        // double click detection; if timer isnt expired...
        if (time < 7 && calState === 1) {
            // action end
            action = 2;
            // go back to idle state
            setCalState(0);

            // pause and reset to prevent triple clicks passing as double clicks
            tPause();
            tReset();
        } else {
            // timer has expired, we only clicked once.
            // determine action depending on button state
            if (calState === 0) {
                action = 0;
                setCalState(1);
            } else if (calState === 1) {
                action = 1;
            }

            //re-start timer
            tReset();
            tStart();
        }

        // emit
        EventManager.emit("calibrate", { id, action });
        e.currentTarget.blur();
    });

    const btnClass = classNames([
        "icon-button",
        "icon-button--calibrate",
        { "calibrating": calState > 0 }
    ]);

    return (
        <button className={btnClass} onClick={triggerCalibrate}>
            <CogSVG></CogSVG>
        </button>
    );
};

export default CalibrateButton;