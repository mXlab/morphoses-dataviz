const osc = require("osc");

class OscManager {
    constructor(localAddress, localPort, onMsg) {
        // configure UDP port
        this.udpPort = new osc.UDPPort({ localAddress, localPort });
        
        // callback on ready
        this.udpPort.on('ready', () => {
            console.log('OSC ready!');
        });

        // callback on input message
        // set by constructor argument
        // TODO: MAKE THIS BETTER!
        this.udpPort.on('message', onMsg);
    }

    // open UDP port
    begin() {
        this.udpPort.open();
    }
}

module.exports = OscManager;