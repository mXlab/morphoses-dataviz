import Robot from '../components/Robot';

class RobotManager {
    constructor() {
        // bindings
        this.loop = ::this.loop;
        
        // register
        this.robots = {};

        // DOM
        this.arena = document.querySelector(".arena");
        this.width = this.arena.clientWidth;
        this.height = this.arena.clientHeight;

        // init
        this.createCanvas();
        this.loop();
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

    loop() {
        // clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // render all created robots here
        for (let r in this.robots)
            this.robots[r].render();

        // loop!
        requestAnimationFrame(this.loop);
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

    static renderDOM(root) {
        root.render();
    }
}

export default RobotManager;