import { OscMessage } from './types';
import SocketManager from './SocketManager';

export default (msg: OscMessage) => {
    let path: Array<string> = msg.address.split("/").slice(1);
    // send event in this way:
    // 1. robot ID
    // 2. OSC args
    // console.log(msg);
    SocketManager.emit(path.join(" "), [path[0], msg.args]);
};