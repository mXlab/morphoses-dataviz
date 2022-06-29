import React from 'react';
import Panel from './Panel';
import Widget from './Widget';

const Controls = (props) => {
    const { registry } = props;

    return (
        <div className="controls">
            {registry.map(({id, name, color}) => {
                return (
                    <Panel key={`${id}--panel`} id={id} name={name} color={color}>
                        <Widget name="Position" tag={id} param="pos" size="2"></Widget>
                        <Widget name="Quaternion" tag={id} param="quat" size="4"></Widget>
                        <Widget name="Rotation" tag={id} param="rot" size="3"></Widget>
                        <Widget name="Motor Quaternion" tag={id} param="mquat" size="4"></Widget>
                        <Widget name="Motor Rotation" tag={id} param="mrot" size="3"></Widget>
                    </Panel>
                )
            })}
        </div>
    );
}

export default Controls;