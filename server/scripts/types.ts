export type OscMessage = {
    address: string;
    args: Array<any>;
};

export type Route = {
    uri: string;
    file: string;
};

export type RobotArgs = {
    robotID: string;
    x: Number;
    y?: Number;
    z?: Number;
    w?: Number;
};