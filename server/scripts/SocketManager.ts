import { Server } from 'socket.io';
import OscManager from './OscManager';

// manager for socket.io event handling
export default class SocketManager {
    static io: Server;

    static start(server: any) {
        SocketManager.io = new Server(server);

        SocketManager.io.on("connection", (socket) => {
            // toggle on/off sending OSC values
            // this is received by the Python sketch and treated internally
            // the naming convention will always be the original OSC address
            // prefixed by /toggle
            socket.on("togsend", msg => {
                // send to OSC
                OscManager.send(`/toggle/${msg.param.replace(" ", "/")}`, [
                    {
                        type: 'i',
                        value: msg.active ? 1 : 0
                    }
                ]);

                // broadcast changes to everyone else
                socket.broadcast.emit("togsend mirror", msg);
            })
        });
    }

    static emit(ev: string, args: any) {
        SocketManager.io.emit(ev, args);
    }
}