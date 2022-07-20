import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import SimpleBar from 'simplebar-react';
import Battery from './Battery';
import EventManager from '../managers/EventManager';

const Panel = ({ id, name, color, children }) => {
    // states
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState(false);


    // create timer
    const time = new Date();
    time.setSeconds(time.getSeconds() + 5);
    const { restart } = useTimer({ expiryTimestamp: time, onExpire: () => {
        setActive(false);
    } });


    // on mount
    useEffect(() => {
        EventManager.plug(`${id} active`, () => {
            setActive(true);
        
            // restart timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + 5);
            restart(time, true);
        });
    }, [id]);


    // styles
    const panelStyle = {
        "--robot-color": color
    };
    // class names
    const className = classNames([
        "panel",
        { collapsed },
        { "panel--inactive": !active }
    ]);
    // rendered name
    const formattedName = collapsed ?
        name.charAt(0) + name.charAt(name.length - 1) :
        name;

    // render
    return (
        <div className={className} style={panelStyle}>
            <div className="panel__header">
                <button onClick={() => setCollapsed(!collapsed)}>{formattedName}</button>
                <Battery id={id} active={active} color={color}></Battery>
            </div>
            
            <SimpleBar style={{ maxHeight: 600 }}>
                {children}
            </SimpleBar>
        </div>
    );
}

export default Panel;