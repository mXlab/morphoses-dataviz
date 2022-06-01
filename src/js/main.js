import EventRegister from './components/EventRegister';
import OSCToggle from './components/OSCToggle';
import GraphManager from './managers/GraphManager';

window.onload = () => {
    GraphManager.init();
    EventRegister.init();

    // create one graph (for testing)
    // ID MATCHES OSC ROUTING PATTERN!!! IMPORTANT
    GraphManager.create('robot1 reward', '.graph1');

    // initialize components
    const $toggles = Array.from(document.querySelectorAll(".toggle"));
    const toggles = $toggles.map(el => new OSCToggle(el));
}