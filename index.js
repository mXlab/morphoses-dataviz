const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const { Server } = require('socket.io');

// my scripts
const OscManager = require('./scripts/osc.js');


// configure .env
dotenv.config();
// configure express
const app = express();
const server = http.createServer(app);


// static folder middleware
app.use(express.static(path.join(__dirname, "static")));
// initialize route(s) and HTML service
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
});


// configure socket.io
const io = new Server(server);
io.on('connection', socket => {
    console.log('a user has connected.');
});


// configure OSC server
const oscManager = new OscManager(
    process.env.OSC_HOST,                   // host
    process.env.OSC_PORT,                   // port
    msg => io.emit(msg.address, msg.args),  // callback
);
oscManager.begin();


// begin listening on http port
server.listen(process.env.HTTP_PORT, () => {
    console.log(`Example app listening on port ${process.env.HTTP_PORT}`);
});