import React from 'react';
import SimpleBar from 'simplebar-react';
import Widget from './Widget';

class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.toggleCollapse = ::this.toggleCollapse;

        this.state = {
            collapsed: false
        };
    }

    toggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        // styles
        const panelStyle = {
            "--robot-color": this.props.color
        };

        // class names
        let className = 'panel';
        if (this.state.collapsed) className += ' panel--collapsed';

        // rendered name
        const name = this.state.collapsed ?
            this.props.name.charAt(0) + this.props.name.charAt(this.props.name.length - 1) :
            this.props.name;

        // render
        return (
            <div className={className} style={panelStyle}>
                <button onClick={this.toggleCollapse} className="panel__header">{name}</button>
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