import { OscMessage } from './types';
import SocketManager from './SocketManager';

export default (msg: OscMessage) => {
    let path: string = msg.address.split("/").slice(1).join(" ");
    SocketManager.emit(path, msg.args);
};