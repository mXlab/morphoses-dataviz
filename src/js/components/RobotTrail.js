// very similar to Graph except it fades over time
import CBuffer from "CBuffer";


class RobotTrail {
    constructor() {
        this.buffer = new CBuffer(5 * 60);  // 5 seconds of info
    }
}

export default RobotTrail;