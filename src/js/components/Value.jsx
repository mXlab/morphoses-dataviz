import EventManager from "../managers/EventManager";
import Graph from "./Graph"
import Lop from './Lop';
import React, { useState, useReducer, useRef, useEffect, useCallback } from "react";
import classNames from "classnames";

const Value = ({ param, subparam, label, disabled, isAngle = false, smooth = 250, initial = 0, precision = 3, range = { min: 0, max: 1 } }) => {
    // using reducer to improve performance and issues w/ heap size incrementing over time
    const reducer = (oldValue, newValue) => newValue;

    const [value, dispatchValue] = useReducer(reducer, initial);
    const [secondValue, dispatchSecondValue] = useReducer(reducer, initial);

    const [lop] = useState(() => new Lop(smooth, initial));
    const [secondLop] = useState(() => new Lop(smooth, initial));
    
    // simple stuff LOL
    const [showGraph, setShowGraph] = useState(false);


    // ref for da graph :3
    const graphRef = useRef();


    // update callback :33
    const onUpdate = useCallback(args => {
        if (disabled) return;
        
        let v;
        if (isAngle) {
            // convert to cartesian value
            const x = Math.cos(parseFloat(subparam ? args[subparam] : args) * Math.PI / 180);
            const y = Math.sin(parseFloat(subparam ? args[subparam] : args) * Math.PI / 180);

            // set values
            lop.set(x);
            secondLop.set(y);
        } else {
            v = parseFloat(subparam ? args[subparam] : args);
            lop.set(v);
        }

        // set LP value (state set in callback below)
    }, [param]);


    // on mount (we only do this once...)
    useEffect(() => {
        // for single value OR x coord of angle
        lop.setCallback(v => {
            const roundV = parseFloat(v.toFixed(precision));

            // update
            dispatchValue(roundV);
            if (graphRef.current && !isAngle) {
                graphRef.current.addValue(roundV);
            }
        });

        // for y coord of angle only
        if (isAngle) {
            secondLop.setCallback(v => {
                const roundY = parseFloat(v.toFixed(precision));
                dispatchSecondValue(roundY);

                // graph added in render function
            });
        };
    }, [isAngle]);

    // useEffect(() => {
        
    // }, [isAngle ? value : secondValue]);


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
                  ? <Graph className="value__graph" disabled={disabled} ref={graphRef} initialValue={value} range={range} />
                  : null;

    return (<>
        <div className={valueClass} data-key={param} data-disabled={disabled}>
            { label ? <span className="value__label">{label}</span> : null }
            <div className="value__container">
                <span className="value__number">
                    {isAngle ? (() => {
                        const theta = parseFloat((Math.atan2(secondValue, value) * 180 / Math.PI).toFixed(precision));
                        if (graphRef.current) graphRef.current.addValue(theta);
                        return theta;
                    })() : value}</span>
                {graph}
            </div>

            <button className="value__show-graph" onClick={() => setShowGraph(!showGraph)}>
                <img src="/images/graph_icon.svg" alt="Toggle graph" />
            </button>
        </div>
    </>);
}


export default Value;