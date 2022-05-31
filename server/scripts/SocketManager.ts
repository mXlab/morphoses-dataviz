const { Server } = require('socket.io');

// manager for socket.io event handling
export default class SocketManager {
    static io: typeof Server;

    static start(server: any) {
        SocketManager.io = new Server(server);
        SocketManager.io.on("connection", () => {
            console.log("a user has connected!");
        });
    }
}