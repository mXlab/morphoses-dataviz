import { Server } from 'socket.io';
import MQTTManager from './MQTTManager';
import OscManager from './OscManager';

// manager for socket.io event handling
export default class SocketManager {
    static io: Server;

    static start(server: any) {
        SocketManager.io = new Server(server);

        // stuff that happens when we connect
        SocketManager.io.on("connection", (socket) => {
            // send out anchor data to the client that just connected (and only that client)
            socket.emit(socket.id + "__anchors", JSON.stringify(MQTTManager.getAnchorData()));

            // TODO:
            // - calibrate action (send to respective robot)
            // - stop everything action (idem)
            // - toggle OSC streaming (idem)
            // - reboot ESP action

            socket.on("calibrate", () => {
                console.log("calibrate");
            });

            socket.on("toggleOSC", () => {
                console.log("toggleOSC");
            });

            socket.on("reboot", id => {
                const idx = parseInt(id.charAt(id.length - 1));
                OscManager.sendToRobot(idx-1, "/reboot");
            });

            // toggle on/off sending OSC values
            // this is received by the Python sketch and treated internally
            // the naming convention will always be the original OSC address
            // prefixed by /toggle
            // socket.on("togsend", msg => {
            //     // send to OSC
            //     OscManager.send(`/toggle/${msg.param.replace(" ", "/")}`, [
            //         {
            //             type: 'i',
            //             value: msg.active ? 1 : 0
            //         }
            //     ]);

            //     // broadcast changes to everyone else
            //     socket.broadcast.emit("togsend mirror", msg);
            // })
        });
    }

    static emit(ev: string, args?: any) {
        SocketManager.io.emit(ev, args);
    }
}