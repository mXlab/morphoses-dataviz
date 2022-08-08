# morphoses — data visualizer

a data visualizer for the [Morphoses](https://github.com/a3lab/morphoses) project by Sofian Audry and Rosalie D. Gagné.

## installation

- copy `.env.example` to `.env` and configure accordingly;
- install dependencies by running `npm i`;
- compile and run the server with `npm run server`;
- compile and watch the JS/CSS/views code with `npm run pack`;
- do both actions above with `npm run admin`

## OF NOTE!

the osc npm library apparently will only digest localhost messages **if and only if the host** (in `.env`, that's `OSCIN_HOST` or `OSCOUT_HOST`) **is set to 0.0.0.0**! beware that the interface may not respond if you omit to consider this fact...