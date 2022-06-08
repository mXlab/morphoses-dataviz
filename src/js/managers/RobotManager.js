import Robot from '../components/Robot';

class RobotManager {
    constructor() {
        this.render = ::this.render;
        
        this.robots = {};

        this.arena = document.querySelector(".arena");
        this.width = this.arena.clientWidth;
        this.height = this.arena.clientHeight;

        this.createCanvas();

        this.render();
    }

    createCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("trails");
        this.canvas.width = this.width * window.devicePixelRatio;
        this.canvas.height = this.height * window.devicePixelRatio;
        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";
        this.arena.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    render() {
        // clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // render all created robots here
        for (let r in this.robots)
            this.robots[r].render();

        // loop!
        requestAnimationFrame(this.render);
    }

    static init() {
        RobotManager.instance = new RobotManager();
    }

    static create(id, opts) {
        const _this = RobotManager.instance;
        
        if (id in _this.robots) return;
        _this.robots[id] = new Robot(id, _this.canvas, opts);
    }

    static get(id) {
        const _this = RobotManager.instance;

        if (!(id in _this.robots)) return;
        return _this.robots[id];
    }
}

export default RobotManager;