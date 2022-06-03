import { Vector3 } from "three";
import { Quaternion } from "three";
import QuatWidget from "./QuatWidget";
import RobotTrail from "./RobotTrail";

const defaults = {
    color: "black"
};

class Robot {
    constructor(id, el, opts) {
        // bindings
        this.render = ::this.render;

        // props
        this.id = id;
        this.container = el;
        this.widget = el.querySelector(".robot");

        this.opts = Object.assign(defaults, opts);

        // data
        this.pos = { x: 0.5, y: 0.5 };
        this.orientation = { x: 0, y: 0, z: 1, w: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.motorOrientation = { x: 0, y: 0, z: 1, w: 0 };
        this.motorRotation = { x: 0, y: 0, z: 0 };

        // more props
        this.allowRender = true;
        this.trailing = true;

        // side components
        this.quatWidget = new QuatWidget();
        this.trail = new RobotTrail(this.opts.color);

        // render
        this.render();
    }

    // set position of robot
    // (where they are)
    setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;

        if (this.trailing) {
            this.trail.push(this.pos);
        }
    }

    // set direction of robot
    // (where they are looking)
    setDirection(mrz) {
        this.motorRotation.z = mrz;
    }

    // set quaternion
    setOrientation(x, y, z, w) {
        const quaternion = new Quaternion();
        quaternion.setFromAxisAngle(new Vector3(x,y,z).normalize(), w * Math.PI * 2);

        this.quatWidget.setOrientation(quaternion);
    }

    render() {
        if (!this.allowRender) {
            return requestAnimationFrame(this.render);
        }

        this.container.style.color = this.opts.color;
        this.container.style.transform = `translate3d(${this.pos.x * 100}%, ${(1 - this.pos.y) * 100}%, 1px)`;
        // TODO: define horizon (what/where is 0 degrees of rotation?)
        this.widget.style.transform = `translate(-50%, -50%) rotate(${(((1 - this.motorRotation.z) * 360) + 90) % 360}deg)`;

        // render widgets
        this.trail.render();
        this.quatWidget.render();

        requestAnimationFrame(this.render);
    }
}

export default Robot;