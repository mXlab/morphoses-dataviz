class Lop {
    constructor(time, initial) {
        this.update = ::this.update;

        this.t = time * 0.001;                              // in seconds
        this.c = 1.0 - Math.exp(-1.0 / (this.t * 60.0));      // sample rate = 60Hz (RAF refresh rate)
        this.v = this.vout = initial;                       // destination + smoothed value

        this.l = requestAnimationFrame(this.update);        // start looping
    }

    // set value
    set(v) {
        if (isNaN(v)) {
            console.log("not a number", v);
            return;
        }
        this.v = v;
    }

    setCallback(cb) {
        this.cb = cb;
    }

    update() {
        // calculate rounded value
        this.vout = this.vout * (1.0 - this.c) + (this.v * this.c);
        // execute external callback
        if (this.cb)
            this.cb(this.vout);
        // RAF
        this.l = requestAnimationFrame(this.update);
    }

    // get instantaneous value
    get() {
        return this.vout;
    }
}

const useLop = ({ time, initial, callback }) => {
    const [value, setValue] = useState(initial);
    const [smoothValue, setSmoothValue] = useState(initial);

    const changeValue = (newvalue) => {

    };

    return [
        smoothValue,
        changeValue
    ];
};

export default Lop;