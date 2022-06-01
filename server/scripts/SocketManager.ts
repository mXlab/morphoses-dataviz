import { Server } from 'socket.io';

// manager for socket.io event handling
export default class SocketManager {
    static io: Server;

    static start(server: any) {
        SocketManager.io = new Server(server);
        SocketManager.io.on("connection", () => {
            console.log("a user has connected!");
        });
    }

    static emit(ev: string, args: any) {
        SocketManager.io.emit(ev, args);
    }
}