import React, { useState, useEffect } from "react";
import { map_range } from '../utils';
import EventManager from "../managers/EventManager";
import DirectionSVG from '../../assets/direction.svg';

const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI / 2;
const PI = Math.PI;

const SpeedSteer = ({ id }) => {
    const [steer, setSteer] = useState(0);
    const [speed, setSpeed] = useState(0);
    
    // event plugs
    useEffect(() => {
        EventManager.plug(`${id} steer`, setSteer);
        EventManager.plug(`${id} speed`, setSpeed);
    }, [id]);

    // transform values
    // method is as follows:
    // 1) first translateY by unity magnitude
    // 2) then rotate depending on direction


    const mag = Math.sqrt(Math.pow(steer, 2) + Math.pow(speed, 2));
    let angle = (steer === 0 && speed === 0) ? 0 : Math.acos(-steer / mag);
    // go around all teh way !!! lulz
    // when crossing the X axis into negative Y territory
    // arccos returns a number from [π..0]
    // so we have to remap it to [π..2π]
    if (speed < 0) angle = map_range(angle, PI, 0, PI, TWO_PI);


    // wheel moveeeee
    const transform = {
        transform: `rotate(${angle - HALF_PI}rad) translateY(${-mag * 12}px)`
    };


    return (
        <div className="speedsteer">
            <DirectionSVG className="arrow arrow--up"    style={{ '--val': Math.max(speed, 0) * 0.9 + 0.1 }} />
            <DirectionSVG className="arrow arrow--right" style={{ '--val': Math.max(steer, 0) * 0.9 + 0.1 }} />
            <DirectionSVG className="arrow arrow--down"  style={{ '--val': Math.max(-speed, 0) * 0.9 + 0.1 }} />
            <DirectionSVG className="arrow arrow--left"  style={{ '--val': Math.max(-steer, 0) * 0.9 + 0.1 }} />

            <div className="wheel">
                <span className="wheel__core" style={transform}></span>
            </div>
        </div>
    )
}

export default SpeedSteer;