// managers
import EventManager from './managers/EventManager';
import GraphManager from './managers/GraphManager';
import RobotManager from './managers/RobotManager';

// components
import OSCToggle from './components/OSCToggle';
import Value from './components/Value';


window.onload = () => {
    // initialize managers
    EventManager.init();
    GraphManager.init();
    RobotManager.init();

    
    // create one graph (for testing)
    // ID MATCHES OSC ROUTING PATTERN!!! IMPORTANT
    //GraphManager.create('robot1 reward', '.graph1', { width: 200, height: 75, slide: 10, domain: 5000 });
    //GraphManager.create('robot2 pos x', '.graph2', { width: 200, height: 75, slide: 0, domain: 5000 });


    // create robots
    RobotManager.create('robot1', { color: "red" });
    RobotManager.create('robot2', { color: "blue" });


    // create value groups
    const value1 = new Value("robot1 pos", { title: "Position", labels: ["x", "y"] });


    // initialize components
    const $toggles = Array.from(document.querySelectorAll(".toggle"));
    const toggles = $toggles.map(el => new OSCToggle(el));
}