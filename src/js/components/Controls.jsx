import React from 'react';
import Panel from './Panel';
import Widget from './Widget';
import ActionWidget from './ActionWidget';

const Controls = (props) => {
    const { registry } = props;

    return (
        <div className="controls">
            {registry.map(({id, name, color}) => {
                return (
                    <Panel key={`${id}--panel`} id={id} name={name} color={color}>
                        <ActionWidget id={id} color={color}></ActionWidget>

                        <Widget name="Position" tag={id} param="pos" size={2}></Widget>
                        <Widget name="Quaternion" tag={id} param="quat" size={4}></Widget>
                        <Widget name="Rotation" tag={id} param="rot" size={3}></Widget>
                        {/* TODO: mrz widget here */}
                    </Panel>
                )
            })}
        </div>
    );
}

export default Controls;