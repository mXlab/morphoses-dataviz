import { Vector3, Quaternion } from "three";
import QuatWidget from "./QuatWidget";
import RobotTrail from "./RobotTrail";

import EventManager from '../managers/EventManager';

const defaults = {
    color: "black"
};

class Robot {
    constructor(id, canvas, opts) {
        // bindings
        this.render = ::this.render;
        this.setPosition = ::this.setPosition;
        this.setDirection = ::this.setDirection;
        this.setOrientation = ::this.setOrientation;
        this.onClick = ::this.onClick;

        // props
        this.id = id;
        this.canvas = canvas;
        this.opts = Object.assign(defaults, opts);

        // more props
        this.allowRender = true;
        this.trailing = true;
        this.size = 20;             // diameter

        // data
        this.pos = { x: 0.5, y: 0.5 };
        this.orientation = { x: 0, y: 0, z: 1, w: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.motorOrientation = { x: 0, y: 0, z: 1, w: 0 };
        this.motorRotation = { x: 0, y: 0, z: 0 };

        // create DOM
        this.createDOM();

        // side components
        this.quatWidget = new QuatWidget();
        this.trail = new RobotTrail(this.canvas, this.opts.color);

        // plug events
        EventManager
            .plug(`${this.id} pos`, this.setPosition)
            .plug(`${this.id} quat`, this.setOrientation)
            .plug(`${this.id} mrot`, this.setDirection);
    }

    createDOM() {
        this.container = document.createElement("div");
        this.container.classList.add("robot__container");
        document.querySelector(".arena").appendChild(this.container);

        this.widget = document.createElement("button");
        this.widget.classList.add("robot");
        this.widget.classList.add(this.id);
        this.container.appendChild(this.widget);

        this.widget.addEventListener("click", this.onClick);

        this.widget.style.color = this.opts.color;
        this.widget.style.width = this.size + "px";
        this.widget.style.height = this.size + "px";
    }

    // set position of robot
    // (where they are)
    setPosition({ x, y }) {
        this.pos.x = x;
        this.pos.y = y;

        if (this.trailing) {
            this.trail.push(this.pos);
        }
    }

    // set direction of robot
    // (where they are looking)
    setDirection({ z:mrz }) {
        this.motorRotation.z = mrz;
    }

    // set quaternion
    setOrientation({ x:qx, y:qy, z:qz, w:qw }) {
        const quaternion = new Quaternion();
        quaternion.setFromAxisAngle(new Vector3(qx,qy,qz).normalize(), qw * Math.PI * 2);

        this.quatWidget.setOrientation(quaternion);
    }

    onClick(e) {
        document.querySelector(".controls").classList.add("visible");
    }

    render() {
        if (!this.allowRender)
            return;

        this.container.style.color = this.opts.color;
        this.container.style.transform = `translate3d(${this.pos.x * 100}%, ${(1 - this.pos.y) * 100}%, 1px)`;
        // TODO: define horizon (what/where is 0 degrees of rotation?)
        this.widget.style.transform = `translate(-50%, -50%) rotate(${(((1 - this.motorRotation.z) * 360) + 90) % 360}deg)`;

        // render widgets
        this.trail.render();
        //this.quatWidget.render();
    }
}

export default Robot;