import React from 'react';
import SimpleBar from 'simplebar-react';
import Widget from './Widget';

class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='panel'>
                <SimpleBar style={{ maxHeight: 600 }}>
                    <Widget name="Position" tag={this.props.id} param="pos" size="2"></Widget>
                    <Widget name="Quaternion" tag={this.props.id} param="quat" size="4"></Widget>
                    <Widget name="Rotation" tag={this.props.id} param="rot" size="3"></Widget>
                    <Widget name="Motor Quaternion" tag={this.props.id} param="mquat" size="4"></Widget>
                    <Widget name="Motor Rotation" tag={this.props.id} param="mrot" size="3"></Widget>
                </SimpleBar>
            </div>
        )
    }
}

export default Panel;