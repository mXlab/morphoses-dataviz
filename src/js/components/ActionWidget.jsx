import React, { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import CBuffer from 'CBuffer';
import EventManager from '../managers/EventManager';
import Value from './Value';
import SpeedSteer from './SpeedSteer';

const ActionWidget = ({ id, color }) => {
    // da states
    const [disabled, setDisabled] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [actions, setActions] = useState([]);

    // da buffer
    const buffer = new CBuffer(11);

    // da socket callback
    const onAction = useCallback(value => {
        buffer.push(value);
        setActions(buffer.toArray().reverse());        // is this necessary???? hrmmm
    }, [])

    // on mount; plug to event
    useEffect(() => {
        EventManager.plug(`${id} action`, onAction);
    }, [id]);


    // state-driven classes
    const widgetClass = classNames([
        "widget",
        "widget--action",
        { disabled },
        { collapsed }
    ]);

    return (
        <div className={widgetClass}>
            <div className="widget__header">
                <button className="widget__toggle" onClick={() => setDisabled(!disabled)}></button>
                <h2 className="widget__title"><button onClick={() => setCollapsed(!collapsed)}>Behavior</button></h2>
            </div>

            <div className="widget__actions">
                <span className="widget__actions--curr" style={{"--robot-color": color}}>{actions[0]}</span>
                <ul className="widget__actions--past">
                    {actions.filter((x,i) => i !== 0).map((x, i) => (
                        <li key={`past-action-${i}`} style={{opacity: Math.pow(1 - (i * 0.1), 2.0)}}>{x}</li>
                    ))}
                </ul>
            </div>

            <div className="line"></div>

            <div className="reward-steer-container">
                <div className="widget__values reward-container">
                    <Value param={`${id} reward moment`} label="I" disabled={disabled}></Value>
                    <Value param={`${id} reward smooth`} label="S" disabled={disabled}></Value>
                </div>

                <div className="line"></div>

                <div className="speedsteer__container">
                    <SpeedSteer id={id}></SpeedSteer>
                </div>
            </div>
        </div>
    );
};

export default ActionWidget;