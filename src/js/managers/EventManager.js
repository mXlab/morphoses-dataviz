import io from 'socket.io-client';

export default class EventManager {
    constructor() {
        this.flagDebug = false;

        // initialize socket
        this.socket = io();
        this.listeners = [];
    }

    static init() {
        EventManager.instance = new EventManager();
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