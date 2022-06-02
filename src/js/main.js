// managers
import EventRegister from './components/EventRegister';
import GraphManager from './managers/GraphManager';
import RobotManager from './managers/RobotManager';

// components
import OSCToggle from './components/OSCToggle';
import QuatWidget from './components/QuatWidget';


window.onload = () => {
    // initialize managers
    EventRegister.init();
    GraphManager.init();
    RobotManager.init();

    // create one graph (for testing)
    // ID MATCHES OSC ROUTING PATTERN!!! IMPORTANT
    GraphManager.create('robot1 reward', '.graph1');

    // create robots
    RobotManager.create('robot1');
    RobotManager.create('robot2');

    // initialize components
    const $toggles = Array.from(document.querySelectorAll(".toggle"));
    const toggles = $toggles.map(el => new OSCToggle(el));
}