import EventManager from "../managers/EventManager";
import Graph from "./Graph"
import React from "react";

class Value extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            active: true,
            showGraph: false
        };

        this.graphRef = React.createRef();

        // bindings
        this.toggleGraph = ::this.toggleGraph;
        this.onUpdate = ::this.onUpdate;
    }

    toggleGraph() {
        this.setState({ showGraph: !this.state.showGraph });
    }

    componentDidMount() {
        // attach listener
        EventManager.plug(this.props.tag, this.onUpdate);
    }

    componentWillUnmount() {
        EventManager.unplug(this.props.tag, this.onUpdate);
    }

    render() {
        // set value class
        let valueClass = "value";
        if (this.state.showGraph)
            valueClass += " graph-visible";

        let graph;
        if (this.state.showGraph) {
            graph = <Graph ref={this.graphRef} initialValue={this.state.value} />;
        } else {
            graph = null;
        }
            
        // rendar!!!!!!! :D
        return (
            <div className={valueClass} data-key={this.props.tag}>
                <span className="label">{this.props.label}</span>
                <span className="number">{this.state.value}</span>

                <button className="show-graph" onClick={this.toggleGraph}>
                    <img src="/images/graph_icon.svg" alt="Toggle graph" />
                </button>

                {graph}
            </div>
        );
    }

    onUpdate(args) {
        const value = parseFloat(args[this.props.subparam].toFixed(this.props.precision));

        // set states
        this.setState({ value });
        if (this.graphRef.current) {
            this.graphRef.current.addValue(value);
        }
    }
}

Value.defaultProps = {
    precision: 3
}

export default Value;