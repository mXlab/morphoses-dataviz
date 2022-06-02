import Graph from "../components/Graph";

class GraphManager {
    constructor() {
        this.graphs = {};
    }

    static init() {
        GraphManager.instance = new GraphManager();
    }

    static create(id, parent, opts) {
        const _this = GraphManager.instance;

        if (id in _this.graphs) return;
        _this.graphs[id] = new Graph(parent, opts);
    }

    static get(id) {
        const _this = GraphManager.instance;
        
        if (!(id in _this.graphs)) return;
        return _this.graphs[id];
    }
}

export default GraphManager;