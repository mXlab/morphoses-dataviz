import Robot from '../components/Robot';

class RobotManager {
    constructor() {
        this.robots = {};
    }

    static init() {
        RobotManager.instance = new RobotManager();
    }

    static create(id, opts) {
        const _this = RobotManager.instance;
        
        if (id in _this.robots) return;
        _this.robots[id] = new Robot(id, document.querySelector(`#${id}`), opts);
    }

    static get(id) {
        const _this = RobotManager.instance;

        if (!(id in _this.robots)) return;
        return _this.robots[id];
    }
}

export default RobotManager;