import classNames from "classnames";
import React, { useCallback, useEffect, useState } from 'react';
import EventManager from "../managers/EventManager";

const IMU = ({ id, type }) => {
    // states
    const [status, setStatus] = useState(0);
    const [margin, setMargin] = useState(0);

    const onUpdate = useCallback(({ status:newStatus, margin:newMargin }) => {
        setStatus(newStatus);
        setMargin(newMargin);
    });

    useEffect(() => {
        EventManager.plug(`${id} ${type} accur`, onUpdate);
    }, [id]);
    
    // render
    const statusBars = [...Array(3).keys()].map(x => {
        const c = classNames([
            "bar",
            { "bar--active": x < status }
        ]);
        return <span key={x} className={c}></span>
    });

    return (
        <div className="imu">
            <span className="imu__type">{type.charAt(0).toUpperCase()}</span>
            <div className="imu__frame">
                <div className="imu__status">{statusBars}</div>
                <span className="imu__margin">±{margin.toFixed(1)}°</span>
            </div>
        </div>
    );
};

export default IMU;