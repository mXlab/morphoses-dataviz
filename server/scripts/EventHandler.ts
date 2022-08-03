import { OscMessage, RobotArgs } from './types';
import SocketManager from './SocketManager';

export const processRobotData = (robotId: Number, msg: OscMessage) => {
    const robotTag = `robot${robotId}`;
    
    // we have received a message; the robot can be marked active
    SocketManager.emit(`${robotTag} active`);

    // pattern matching time :3
    switch (msg.address) {
        case '/ready':
        {
            console.log("ready");
        }

        // battery level
        case '/battery':
        {
            const [battery] = msg.args;
            SocketManager.emit(`${robotTag} battery`, battery);
            break;
        }
        
        // IMU precision
        case '/main/accur':
        case '/side/accur':
        {
            const [status, margin] = msg.args;
            const type = msg.address.split('/')[1];
            SocketManager.emit(`${robotTag} ${type} accur`, { status, margin });
            break;
        }
        
        // quaternions
        case '/main/quat':
        case '/side/quat':
        {
            const [x, y, z, w] = msg.args;
            const type = msg.address.split('/')[1];
            SocketManager.emit(`${robotTag} ${type === "main" ? "mquat" : "quat"}`, { x, y, z, w });
            break;
        }

        case '/main/rot':
        case '/side/rot':
        {
            const [x, y, z] = msg.args;
            const type = msg.address.split('/')[1];
            SocketManager.emit(`${robotTag} ${type === "main" ? "mrot" : "rot"}`, { x, y, z });
            break;
        }
    }
};

export const processMLData = (msg: OscMessage) => {
    const robotTag = msg.address.split("/")[1];

    // we have received a message; the robot can be marked active
    SocketManager.emit(`${robotTag} active`);

    
    // extract value type
    const type = msg.address.split("/")[2];
    if (!type) return;

    // pattern matching
    switch (type) {
        case 'reward':
        case 'action':
        case 'speed':
        case 'steer':
        {
            // these are all single values so we can parse them the same
            const [value] = msg.args;
            SocketManager.emit(`${robotTag} ${type}`, value);
            break;
        }

        default:
        {
            console.log(msg.address);
            break;
        }
    }
}