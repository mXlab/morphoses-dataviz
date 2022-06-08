import EventManager from "../managers/EventManager";

const defaults = {
    title: "Value",
    hasGraph: true,
    labels: ["v"],
    precision: 3,
}

class Value {
    constructor(id, opts = {}) {
        this.onUpdate = ::this.onUpdate;

        this.id = id;       // event ID on which we should be plugged on
        this.opts = Object.assign(defaults, opts);

        // link DOM
        this.el = document.querySelector(`.value[data-key="${this.id}"]`);

        // attach listener
        EventManager.plug(this.id, this.onUpdate);
    }

    onUpdate([robotID, data]) {
        this.el.innerHTML = this.opts.labels
            .map((label, i) => `${label}: ${data[i].toFixed(this.opts.precision)}`)
            .join("<br>");
    }
}

export default Value;