import { OscMessage, RobotArgs } from './types';
import SocketManager from './SocketManager';

export default (msg: OscMessage) => {
    let path: Array<string> = msg.address.split("/").slice(1);


    // battery level
    if (path.some(x => x === "battery")) {
        SocketManager.emit(path.join(" "), msg.args[0]);
        return;
    }


    // TODO: actions
    if (path.some(x => x === "action")) {
        return;
    }


    // TODO: rewards
    if (path.some(x => x === "reward")) {
        return;
    }
    

    // COORDINATES
    // send event in this way:
    // 1. robot ID
    // 2. OSC args

    // auto-set keys to values
    let args: RobotArgs = msg.args.reduce((a, b, i) => Object.assign(a, { ["xyzw".charAt(i)]: b }), {});
    args.robotID = path[0];
    
    // send everything in a single packet
    SocketManager.emit(path.join(" "), args);

    // TODO: send each value individually
    
};