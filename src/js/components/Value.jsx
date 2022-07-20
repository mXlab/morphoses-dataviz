import EventManager from "../managers/EventManager";
import Graph from "./Graph"
import React, { useState, useRef, useEffect, useCallback } from "react";
import classNames from "classnames";

const Value = ({ tag, subparam, label, disabled, precision = 3 }) => {
    const [value, setValue] = useState(0);
    const [showGraph, setShowGraph] = useState(false);

    // ref for da graph :3
    const graphRef = useRef();

    // update callback :33
    const onUpdate = useCallback((args) => {
        if (disabled) return;

        // parse value to float (since it's apparently a string when received here)
        // also make up for the presence of a subparam or not
        const value = subparam
                    ? parseFloat(args[subparam].toFixed(precision))
                    : parseFloat(args.toFixed(precision));

        // set states
        setValue(value);
        if (graphRef.current) {
            graphRef.current.addValue(value);
        }
    }, []);


    // mount
    useEffect(() => {
        if (!disabled) {
            EventManager.plug(tag, onUpdate);
        } else {
            EventManager.unplug(tag, onUpdate);
        }
    }, [disabled]);


    // render
    const valueClass = classNames([
        "value",
        { "graph-visible": showGraph }
    ]);

    const graph = showGraph
                  ? <Graph disabled={disabled} ref={graphRef} initialValue={value} />
                  : null;

    return (
        <div className={valueClass} data-key={tag} data-disabled={disabled}>
            <span className="label">{label}</span>
            <span className="number">{value}</span>

            <button className="show-graph" onClick={() => setShowGraph(!showGraph)}>
                <img src="/images/graph_icon.svg" alt="Toggle graph" />
            </button>

            {graph}
        </div>
    );
}


export default Value;