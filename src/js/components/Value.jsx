import EventManager from "../managers/EventManager";
import Graph from "./Graph"
import Lop from './Lop';
import React, { useState, useReducer, useRef, useEffect, useCallback } from "react";
import classNames from "classnames";

const Value = ({ param, subparam, label, disabled, precision = 3, range = { min: 0, max: 1 } }) => {
    // using reducer to improve performance and issues w/ heap size incrementing over time
    const reducer = (oldValue, newValue) => newValue;
    const [value, dispatchValue] = useReducer(reducer, 0.0);
    const [lop] = useState(() => new Lop(250, 0));
    // simple stuff LOL
    const [showGraph, setShowGraph] = useState(false);


    // ref for da graph :3
    const graphRef = useRef();


    // update callback :33
    const onUpdate = useCallback(args => {
        if (disabled) return;

        // parse value to float (since it's apparently a string when received here)
        // also make up for the presence of a subparam or not
        const v = parseFloat(subparam ? args[subparam] : args);

        // set LP value (state set in callback below)
        lop.set(v);
    }, [param]);


    // on mount (we only do this once...)
    useEffect(() => {
        lop.setCallback(v => {
            const rounded = parseFloat(v.toFixed(precision));

            // update
            dispatchValue(rounded);
            if (graphRef.current)
                graphRef.current.addValue(rounded);
        });
    }, [param]);


    // enable/disable data update
    useEffect(() => {
        if (!disabled) {
            EventManager.plug(param, onUpdate);
        } else {
            EventManager.unplug(param, onUpdate);
        }

        return () => {
            EventManager.unplug(param, onUpdate);
        }
    }, [disabled]);


    // render
    const valueClass = classNames([
        "value",
        { "graph-visible": showGraph }
    ]);

    const graph = showGraph
                  ? <Graph disabled={disabled} ref={graphRef} initialValue={value} range={range} />
                  : null;

    return (<>
        <div className={valueClass} data-key={param} data-disabled={disabled}>
            { label ? <span className="label">{label}</span> : null }
            <span className="number">{value}</span>

            <button className="show-graph" onClick={() => setShowGraph(!showGraph)}>
                <img src="/images/graph_icon.svg" alt="Toggle graph" />
            </button>

            {graph}
        </div>
    </>);
}


export default Value;