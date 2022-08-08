import React from 'react';

import Panel from './Panel';
import Widget from './Widget';
import Value from './Value';
import SpeedSteer from './SpeedSteer';
import ActionWidget from './ActionWidget';

const Controls = (props) => {
    const { registry } = props;

    return (
        <div className="controls">
            {registry.map(({id, name, color}) => {
                return (
                    <Panel key={`${id}--panel`} id={id} name={name} color={color}>
                        <ActionWidget id={id}></ActionWidget>

                        <Widget name="Position" tag={id} param="pos">
                            <Value param={`${id} pos`} subparam="x" label="X" smooth={500} />
                            <Value param={`${id} pos`} subparam="y" label="Y" smooth={500} />
                        </Widget>

                        <Widget name="M.Rotation" tag={id} param="mrot" size={3}>
                            <Value param={`${id} mrot`} subparam="x" label="X" isAngle range={{min:-180, max:180}} />
                            <Value param={`${id} mrot`} subparam="y" label="Y" isAngle range={{min:-180, max:180}} />
                            <Value param={`${id} mrot`} subparam="z" label="Z" isAngle range={{min:-180, max:180}} />
                        </Widget>

                        <Widget name="M.Quaternion" tag={id} param="mquat">
                            <Value param={`${id} mquat`} subparam="x" label="X" />
                            <Value param={`${id} mquat`} subparam="y" label="Y" />
                            <Value param={`${id} mquat`} subparam="z" label="Z" />
                            <Value param={`${id} mquat`} subparam="w" label="W" />
                        </Widget>

                        <Widget name="S.Rotation" tag={id} param="rot">
                            <Value param={`${id} rot`} subparam="x" label="X" isAngle range={{min:-180, max:180}} />
                            <Value param={`${id} rot`} subparam="y" label="Y" isAngle range={{min:-180, max:180}} />
                            <Value param={`${id} rot`} subparam="z" label="Z" isAngle range={{min:-180, max:180}} />
                        </Widget>

                        <Widget name="S.Quaternion" tag={id} param="quat">
                            <Value param={`${id} quat`} subparam="x" label="X" />
                            <Value param={`${id} quat`} subparam="y" label="Y" />
                            <Value param={`${id} quat`} subparam="z" label="Z" />
                            <Value param={`${id} quat`} subparam="w" label="W" />
                        </Widget>
                    </Panel>
                )
            })}
        </div>
    );
}

export default Controls;