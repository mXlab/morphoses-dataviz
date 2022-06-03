import EventManager from '../managers/EventManager';

class OSCToggle {
    constructor(el, opts) {
        this.el = el;
        this.opts = opts;

        this.el.addEventListener("click", this.onClick);
    }

    onClick(e) {
        const {param} = e.currentTarget.dataset;
        const active = e.currentTarget.checked;
        EventManager.emit("togsend", { param, active });
    }
}

export default OSCToggle;