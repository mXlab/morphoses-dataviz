import { OscMessage, RobotArgs } from './types';
import SocketManager from './SocketManager';

export default (robotId: Number, msg: OscMessage) => {
    const robotTag = `robot${robotId}`;
    
    // we have received a message; the robot can be marked active
    SocketManager.emit(`${robotTag} active`);

    // pattern matching time :3
    switch (msg.address) {
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
        
        // position
        case '/position':
        {
            const [x, y] = msg.args;
            SocketManager.emit(`${robotTag} pos`, { x, y });
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

        case '/reward':
        {
            const [reward] = msg.args;
            SocketManager.emit(`${robotTag} reward`, reward);
            break;
        }

        case '/action':
        {
            const [action] = msg.args;
            SocketManager.emit(`${robotTag} action`, action);
            break;
        }
    }
};