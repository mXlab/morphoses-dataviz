import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Value from './Value';

const Widget = ({ name, tag, param, size, children }) => {
    // states
    const [disabled, setDisabled] = useState(false);
    const [collapsed, setCollapsed] = useState(false);


    // state-driven classes
    const widgetClass = classNames([
        "widget",
        { disabled },
        { collapsed }
    ]);

    // render
    return (
        <div className={widgetClass}>
            <div className="widget__header">
                <button className="widget__toggle" onClick={() => setDisabled(!disabled)}></button>
                <h2 className="widget__title"><button onClick={() => setCollapsed(!collapsed)}>{name}</button></h2>
            </div>

            <div className="widget__values">{children}</div>
        </div>
    )
};

export default Widget;