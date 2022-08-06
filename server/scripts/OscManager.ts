const { UDPPort } = require("osc");
const chalk = require("chalk");
import { OscMessage } from './types';

// robot configs

// manager for OSC communication with Python sketch
export default class OscManager
{
    // members
    mlPort: typeof UDPPort;
    robotPorts: Map<String, typeof UDPPort>;
    timers: Map<String, NodeJS.Timer>;

    localAddress: String;
    localPort: String;
    remoteAddress: String;
    remotePort: String;

    robotCallback: Function | undefined;
    mlCallback: Function | undefined;

    // instance
    static instance: OscManager;


    // constructor
    constructor(robotCallback?: Function, mlCallback?: Function) {
        // set callback
        this.robotCallback = robotCallback;
        this.mlCallback = mlCallback;

        this.timers = new Map<String, NodeJS.Timer>();

        // configure
        this.configureMLPort();
        this.configureRobotPorts();    
    }

    /**
     * Configure the UDP port that will connect to the ML system computing reward, actions, etc.
     */
    configureMLPort() {
        // initialize ML port
        this.mlPort = new UDPPort({
            localAddress:   process.env.OSCIN_HOST, 
            localPort:      process.env.OSCIN_PORT,
            remoteAddress:  process.env.OSCOUT_HOST,
            remotePort:     process.env.OSCOUT_PORT
        });

        // has connected
        this.mlPort.on("ready", () => {
            console.log(chalk.bold.bgMagenta.white("[ML]")
                + "\tIN  "  + chalk.bold.black(this.mlPort.options.localAddress + ":" + this.mlPort.options.localPort)
                + "\tOUT  " + chalk.bold.black(this.mlPort.options.remoteAddress + ":" + this.mlPort.options.remotePort));
        });

        // error messages
        this.mlPort.on("error", (error: any) => {
            console.log(chalk.bold.bgMagenta.white("[ML]") + chalk.red.bold("\tERROR:"));
            console.error(error);
        });

        // on message
        this.mlPort.on('message', (msg: OscMessage) => {
            if (this.mlCallback)
                this.mlCallback(msg);
        });

        // open port
        this.mlPort.open();
    }


    /**
     * Configure the UDP ports that will connect
     * through OSC to each of the available robots,
     * retrieving such infos as realtime IMU data, battery, etc.
     */
    configureRobotPorts() {
        // initialize map object
        this.robotPorts = new Map<String, typeof UDPPort>();

        // initialize robot ports
        for (let i = 1; i <= 3; i++) {
            // configure
            const port: typeof UDPPort = new UDPPort({
                localAddress:   process.env.OSCIN_HOST,
                localPort:      `81${i}0`,
                remoteAddress:  `192.168.0.1${i}0`,
                remotePort:     "8000"
            });

            // on ready
            port.on('ready', () => {
                console.log(chalk.bold.bgBlue.white(`[R${i}]`)
                    + "\tIN  "  + chalk.bold.black(port.options.localAddress + ":" + port.options.localPort)
                    + "\tOUT  " + chalk.bold.black(port.options.remoteAddress + ":" + port.options.remotePort));
            });

            port.on('error', (error: any) => {
                console.log(chalk.bold.bgBlue.white(`[R${i}]`) + chalk.red.bold("\tERROR:"));
                console.error(error);
            });

            // on message
            port.on('message', (msg: OscMessage) => {
                if (this.robotCallback)
                    this.robotCallback(i, msg);
            });

            // open port
            port.open();
            // query info receive
            // TODO: reconnect if necessary (will not  be necessary ☺️)
            port.send({ address: "/bonjour" });

            // add to array of ports
            this.robotPorts.set("robot" + i, port);
        }
    }

    // start
    static start(robotCallback?: Function, mlCallback?: Function) {
        OscManager.instance = new OscManager(robotCallback, mlCallback);
    }

    static sendToRobot(id: String, address: string, args?: any) {
        const _this = OscManager.instance;

        // get index
        const idx = parseInt(id.charAt(id.length - 1)) - 1;

        // check if index within bounds
        if (idx < 0 || idx >= _this.robotPorts.size) {
            console.error(chalk.bold.red("ERROR") + `\trobot port at index ${idx} was not found`);
            console.trace()
            return;
        }

        // send to appropriate port
        _this.robotPorts.get(id).send({ address, args });
    }

    /**
     * Start queueing a reconnection if it is ever lost
     * @param id 
     */
    static queuePing(id: String) {
        const _this = OscManager.instance;

        if (!_this.timers.get(id))      // make sure we arent duplicating...
            {
            _this.timers.set(id, setInterval(() => {
                console.log("repinging " + id + "...");
                OscManager.sendToRobot(id, "/bonjour");
            }, 2000));
        }
    }

    /**
     * Cancel a pinging 
     * @param id 
     */
    static cancelPing(id: String) {
        const _this = OscManager.instance;
        clearInterval(_this.timers.get(id));
    }
}