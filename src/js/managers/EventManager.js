import io from 'socket.io-client';

export default class EventManager {
    constructor() {
        this.flagDebug = false;
        this.anchors = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            // initialize socket
            this.socket = io();
            this.socket.on("connect", () => {
                this.socket.on(this.socket.id + "__anchors", data => {
                    resolve(data);
                });
            });
            this.listeners = [];
        });
    }

    static init() {
        EventManager.instance = new EventManager();
        return EventManager.instance.connect();
    }

    static emit(evt, args) {
        EventManager.instance.socket.emit(evt, args);
    }

    // PLUG / UNPLUG LISTENER
    static plug(evt, listener) {
        EventManager.instance.socket.on(evt, listener);
        EventManager.instance.listeners.push({ evt, listener });

        return EventManager;
    }
    static unplug(evt, listener) {
        EventManager.instance.socket.off(evt, listener);
        EventManager.instance.listeners = EventManager.instance.listeners.filter(x => x.evt !== evt && x.listener !== listener);

        return EventManager;
    }

    static hasPlug(evt, listener) {
        return EventManager.instance.listeners.some(x => x.evt === evt && x.listener === listener);
    }
}