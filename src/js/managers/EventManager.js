import io from 'socket.io-client';

import GraphManager from './GraphManager';
import RobotManager from './RobotManager';
import globals from '../globals';
import { parseCoords } from '../utils';

export default class EventManager {
    constructor() {
        this.flagDebug = false;

        // initialize socket
        this.socket = io();
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
        return EventManager;
    }
    static unplug(evt, listener) {
        EventManager.instance.socket.off(evt, listener);
        return EventManager;
    }
}