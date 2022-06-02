import { Vector3 } from "three";
import { Quaternion } from "three";
import QuatWidget from "./QuatWidget";

class Robot {
    constructor(id, el) {
        this.id = id;
        // DOM
        this.container = el;
        this.widget = el.querySelector(".robot");

        this.pos = { x: 0.5, y: 0.5 };
        this.orientation = { x: 0, y: 0, z: 1, w: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };

        this.motorOrientation = { x: 0, y: 0, z: 1, w: 0 };
        this.motorRotation = { x: 0, y: 0, z: 0 };

        // quaternion widget
        this.quatWidget = new QuatWidget();
    }

    // set position of robot
    // (where they are)
    setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;

        this.redraw();
    }

    // set direction of robot
    // (where they are looking)
    setDirection(mrz) {
        this.motorRotation.z = mrz;

        this.redraw();
    }

    // set quaternion
    setOrientation(x, y, z, w) {
        const quaternion = new Quaternion();
        quaternion.setFromAxisAngle(new Vector3(x,y,z).normalize(), w * Math.PI * 2);

        this.quatWidget.setOrientation(quaternion);
    }

    redraw() {
        this.container.style.transform = `translate3d(${this.pos.x * 100}%, ${(1 - this.pos.y) * 100}%, 1px)`;
        // TODO: define horizon (what/where is 0 degrees of rotation?)
        this.widget.style.transform = `rotate(${((1 - this.motorRotation.z) * 360) + 90 % 360}deg)`;
    }
}

export default Robot;