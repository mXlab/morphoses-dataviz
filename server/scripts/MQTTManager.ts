import mqtt from 'mqtt';
const chalk = require ('chalk');
import SocketManager from './SocketManager';

type Position = {
    id: String;
    x: Number;
    y: Number;
    z: Number;
};

export default class MQTTManager {
    client: mqtt.MqttClient;
    positions: Array<Position>;
    // instance
    static instance: MQTTManager;
    
    constructor(address: String, port: Number | String) {
        this.client = mqtt.connect(`http://${address}:${port}`);
        this.client.on("connect", () => {
            console.log(chalk.bgGreen.bold.white("[MQTT]") + "\tconnected to\t" + `${address}:${port}`);

            this.subscribeToAnchors();
        });

        // create positions
        this.positions = [];
        this.client.on("message", this.onMessage.bind(this));
    }

    subscribeToAnchors() {
        // subscribe to anchors to get their location
        let anchorIDs = process.env.ANCHOR_IDS?.split(" ");
        anchorIDs?.forEach(id => {
            this.client.subscribe(`dwm/node/${id}/uplink/config`);
        });
    }

    onMessage(topic: String, message: any) {
        const [,,id,,type] = topic.split("/");
        if (type === "config") {
            const json = JSON.parse(message.toString());
            const { x, y, z } = json.configuration.anchor.position;
            this.positions.push({ id, x, y, z });
        }
    }

    // 
    static start(address: String = "", port: Number | String = "") {
        MQTTManager.instance = new MQTTManager(address, port);
    }

    // when someone connects, we request ..
    static getAnchorData() : Array<Position> {
        return MQTTManager.instance.positions;
    }
}