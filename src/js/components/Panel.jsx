import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import Battery from './Battery';

const Panel = (props) => {
    // props
    const { id, name, color, children } = props;

    // states
    const [collapsed, setCollapsed] = useState(false);


    // styles
    const panelStyle = {
        "--robot-color": color
    };

    // class names
    let className = 'panel';
    if (collapsed) className += ' panel--collapsed';

    // rendered name
    const formattedName = collapsed ?
        name.charAt(0) + name.charAt(name.length - 1) :
        name;

    // render
    return (
        <div className={className} style={panelStyle}>
            <div className="panel__header">
                <button onClick={() => setCollapsed(!collapsed)}>{formattedName}</button>
                <Battery id={id} active={true} color={color}></Battery>
            </div>
            
            <SimpleBar style={{ maxHeight: 600 }}>
                {children}
            </SimpleBar>
        </div>
    )
}

export default Panel;