import React from 'react';
import Value from './Value';

class Widget extends React.Component {
    constructor(props) {
        super(props);

        // bindings
        this.toggleWidget = ::this.toggleWidget;

        // states
        this.state = {
            disabled: false,
        }
    }

    componentDidMount() {
    }

    toggleWidget() {
        this.setState({ disabled: !this.state.disabled });
    }

    render() {
        let widgetClass = 'widget';
        if (this.state.disabled)
            widgetClass += ' disabled';
        
        // define Value object array
        let values = [];
        for (let i = 0; i < this.props.size; i++) {
            values.push(<Value
                key={`${this.props.tag} ${this.props.param}${i}`}
                tag={`${this.props.tag} ${this.props.param}`}
                subparam={"xyzw".charAt(i)}
                label={"XYZW".charAt(i)}
            ></Value>);
        }

        return (
            <div className={widgetClass}>
                <div className="widget__header">
                    <button className="widget__toggle" onClick={this.toggleWidget}></button>
                    <h2 className="widget__title">{this.props.name}</h2>
                    <span className="widget__addr">{`/${this.props.tag}/${this.props.param}`}</span>
                </div>

                <div className="widget__values">
                    {values}
                </div>
            </div>
        )
    } 
}

export default Widget;