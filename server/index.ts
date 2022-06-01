import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';

// types
import { OscMessage, Route } from './scripts/types';
// static classes
import OscManager from './scripts/OscManager';
import SocketManager from './scripts/SocketManager';
import EventHandler from './scripts/EventHandler';
// expressjs routes
import routes from './routes';


// configure .env
dotenv.config();
// configure express
const app = express();
const server = http.createServer(app);


// static folder middleware
app.use(express.static(path.join(__dirname, "public")));

// initialize route(s) and HTML service
routes.forEach((route: Route) => {
    app.get(route.uri, (req, res) => {
        res.sendFile(path.join(__dirname, `public/${route.file}.html`));
    });
});


// configure socket.io
SocketManager.start(server);
// configure OSC server
OscManager.start(
    process.env.OSC_HOST,       // host
    process.env.OSC_PORT,       // port
    EventHandler                // handler
);


// begin listening on http port
server.listen(process.env.HTTP_PORT, () => {
    console.log(`Example app listening on port ${process.env.HTTP_PORT}`);
});