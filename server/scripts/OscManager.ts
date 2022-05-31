const { UDPPort } = require("osc");

// manager for OSC communication with Python sketch
export default class OscManager {
    // members
    static udpPort: typeof UDPPort;

    // constructor
    static start(localAddress: string, localPort: string, onMsg: Function) {
        // configure UDP port
        OscManager.udpPort = new UDPPort({ localAddress, localPort });
        
        // callback on ready
        OscManager.udpPort.on('ready', () => {
            console.log('OSC ready!');
        });

        // callback on input message
        // set by constructor argument
        // TODO: MAKE THIS BETTER!
        OscManager.udpPort.on('message', onMsg);

        // open UDP port
        OscManager.udpPort.open();
    }
}