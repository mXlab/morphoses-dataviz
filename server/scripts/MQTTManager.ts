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
    anchorIDs: Array<String>;
    robotIDs: Array<String>;

    // instance
    static instance: MQTTManager;
    
    constructor(address: String, port: Number | String) {
        // create objects
        this.positions = [];
        this.anchorIDs = process.env.ANCHOR_IDS?.split(" ") ?? [];
        this.robotIDs = process.env.ROBOT_IDS?.split(" ") ?? [];

        // warnings
        if (!this.anchorIDs.length) {
            console.warn(chalk.bold.yellow("WARNING") + "\tANCHOR_IDS is possibly undefined; are you sure you included it in your .env file?");
        }

        if (!this.robotIDs.length) {
            console.warn(chalk.bold.yellow("WARNING") + "\tROBOT_IDS is possibly undefined; are you sure you included it in your .env file?");
        }


        // setup MQTT client
        this.client = mqtt.connect(`http://${address}:${port}`);
        this.client.on("connect", () => {
            console.log(chalk.bgGreen.bold.white("[MQTT]") + "\tconnected to\t" + `${address}:${port}`);

            // subscribe to topics once connected
            this.subscribe();
        });
        this.client.on("message", this.onMessage.bind(this));
    }

    subscribe() {
        this.anchorIDs.forEach(id => {
            this.client.subscribe(`dwm/node/${id}/uplink/config`);
        });
        this.robotIDs.forEach(id => {
            this.client.subscribe(`dwm/node/${id}/uplink/location`);
        });
    }

    onMessage(topic: String, message: any) {
        const [,,id,,type] = topic.split("/");

        if (type === "config") {
            const json = JSON.parse(message.toString());
            const { x, y, z } = json.configuration.anchor.position;

            // push to array
            this.positions.push({ id, x, y, z });
        }

        if (type === "location") {
            const json = JSON.parse(message.toString());
            const { x, y, z, quality } = json.position;

            // find index through tag id
            const robotIndex = this.robotIDs.indexOf(id) ?? -1;
            if (robotIndex < 0) {
                console.error(chalk.bold.red("ERROR") + "\tcouldn't find index of robot id " + id);
            }

            // send out position to client socket
            const robotTag = `robot${robotIndex + 1}`;
            SocketManager.emit(robotTag + " pos", { x, y, z, quality });
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