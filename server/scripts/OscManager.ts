const { UDPPort } = require("osc");
const chalk = require("chalk");
import { OscMessage } from './types';

// robot configs

// manager for OSC communication with Python sketch
export default class OscManager
{
    // members
    port: typeof UDPPort;
    robotPorts: Array<typeof UDPPort> = [];
    localAddress: String;
    localPort: String;
    remoteAddress: String;
    remotePort: String;
    callback: Function | undefined;

    // instance
    static instance: OscManager;


    // constructor
    constructor({ localAddress = "", localPort = "", remoteAddress = "", remotePort = "" } : any, callback?: Function)
    {
        // set callback
        this.callback = callback;

        // initialize robot ports
        for (let i = 0; i < 3; i++) {
            const localPort = `81${i + 1}0`;
            const remoteAddress = `192.168.0.1${i+1}0`;
            const remotePort = "8000";

            // configure
            const port: typeof UDPPort = new UDPPort({
                localAddress, localPort,            // receive
                remoteAddress, remotePort           // send
            });

            // on ready
            port.on('ready', () => {
                console.log(chalk.bold.bgBlue.white(`[R${i+1}]`) + "\tlistening on\t" + chalk.bold.black(localAddress + ":" + localPort));
                console.log(chalk.bold.bgBlue.white(`[R${i+1}]`) + "\tsending to\t"   + chalk.bold.black(remoteAddress + ":" + remotePort));
            });

            port.on('error', (error: any) => {
                console.log(chalk.bold.bgBlue.white(`[R${i+1}]`) + "\tERROR:");
                console.error(error);
            });

            // on message
            port.on('message', (msg: OscMessage) => {
                if (this.callback)
                    this.callback(i, msg);
            });

            // open port
            port.open();
            // query info receive
            // TODO: reconnect if necessary
            port.send({ address: "/bonjour" });

            // add to array of ports
            this.robotPorts.push(port);
        }
    }

    // start
    static start(config: Object, callback?: Function) {
        OscManager.instance = new OscManager(config, callback);
    }
}