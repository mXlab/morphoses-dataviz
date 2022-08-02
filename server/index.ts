import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
const chalk = require("chalk");

// types
import { OscMessage, Route } from './scripts/types';
// static classes
import OscManager from './scripts/OscManager';
import SocketManager from './scripts/SocketManager';
import EventHandler from './scripts/EventHandler';
// expressjs routes
import routes from './routes';
import MQTTManager from './scripts/MQTTManager';


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
OscManager.start({
    localAddress: process.env.OSCIN_HOST,       // in host
    localPort: process.env.OSCIN_PORT,          // in port,
    remoteAddress: process.env.OSCOUT_HOST,     // out host,
    remotePort: process.env.OSCOUT_PORT         // out port
}, EventHandler);

MQTTManager.start(process.env.MQTT_HOST, process.env.MQTT_PORT);

/*
subscribe to
dwm/node/[id]/uplink/location
@return string [JSON]

*/


// begin listening on http port
server.listen(process.env.HTTP_PORT, () => {
    console.log(chalk.bold.white.bgCyan('[HTTP]') + `\tlistening on\tlocalhost:${process.env.HTTP_PORT}`);
});