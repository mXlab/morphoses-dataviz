import EventManager from "../managers/EventManager";
import React, { useState } from "react";

const defaults = {
    title: "Value",
    hasGraph: true,
    labels: ["v"],
    precision: 3,
}

class Value extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            active: true,
            showGraph: false
        };

        // bindings
        this.toggleGraph = ::this.toggleGraph;
        this.onUpdate = ::this.onUpdate;

        // options
        this.opts = Object.assign(defaults, this.props.opts);

        // attach listener
        EventManager.plug(this.props.tag, this.onUpdate);
    }

    toggleGraph() {
        this.setState({ showGraph: !this.state.showGraph });
    }

    render() {
        // set value class
        let valueClass = "value";
        if (this.state.showGraph)
            valueClass += " graph-visible";

        // TODO: set label class(?)
        
        return (
            <div className={valueClass} data-key={this.props.tag}>
                <span className="label">{this.props.label}</span>
                <span className="number">{this.state.value}</span>

                <button className="show-graph" onClick={this.toggleGraph}>
                    <img src="/images/graph_icon.svg" alt="Toggle graph" />
                </button>
            </div>
        );
    }

    onUpdate(args) {
        this.setState({
            value: args[this.props.subtag].toFixed(this.opts.precision)
        });
        
        // this.el.innerHTML = this.opts.labels
        //     .map((label, i) => `${label}: ${data[i].toFixed(this.opts.precision)}`)
        //     .join("<br>");
    }
}

export default Value;