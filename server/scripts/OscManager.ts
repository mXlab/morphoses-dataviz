const { UDPPort } = require("osc");
const chalk = require("chalk");

// manager for OSC communication with Python sketch
export default class OscManager {
    // members
    static port: typeof UDPPort;

    // constructor
    static start(
        { localAddress = "", localPort = "", remoteAddress = "", remotePort = "" } :
        { localAddress: string, localPort: string, remoteAddress: string, remotePort: string },
        onMsg: Function
        ) {

        // configure port
        OscManager.port = new UDPPort({
            localAddress, localPort,        // receive
            remoteAddress, remotePort       // send
        });
        
        // callback on ready
        OscManager.port.on('ready', () => {
            console.log(chalk.bold.bgRed.white("[OSC]") + `\treceiving on\t${localAddress}:${localPort}`);
            console.log(chalk.bold.bgRed.white("[OSC]") + `\tsending on\t${remoteAddress}:${remotePort}`);
        });

        // callback on input message
        // set by constructor argument
        // TODO: MAKE THIS BETTER!
        OscManager.port.on('message', onMsg);

        // open port
        OscManager.port.open();
    }

    static send(address: string, args: any) {
        OscManager.port.send({ address, args });
    }
}