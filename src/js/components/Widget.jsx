import React from 'react';

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

    toggleWidget() {
        this.setState({ disabled: !this.state.disabled });
    }

    render() {
        let widgetClass = 'widget';
        if (this.state.disabled)
            widgetClass += ' disabled';

        return (
            <div className={widgetClass}>
                <div className="widget__header">
                    <button className="widget__toggle" onClick={this.toggleWidget}></button>
                    <h2 className="widget__title">{this.props.name}</h2>
                    <span className="widget__addr">{this.props.addr}</span>
                </div>

                <div className="widget__values">
                    {this.props.children}
                </div>
            </div>
        )
    } 
}

export default Widget;