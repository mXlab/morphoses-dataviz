// reactjs
import React from 'react';
import * as ReactDOM from 'react-dom/client';

// managers
import EventManager from './managers/EventManager';
import GraphManager from './managers/GraphManager';
import RobotManager from './managers/RobotManager';

// components
import OSCToggle from './components/OSCToggle';
import Panel from './components/Panel';
import Widget from './components/Widget';
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
    RobotManager.create('robot1', { name: "Robot 1", color: "#CA0000" });
    RobotManager.create('robot2', { name: "Robot 2", color: "#008DCA" });


    // create value groups
    //const value1 = new Value("robot1 pos", { title: "Position", labels: ["x", "y"] });


    // initialize components
    const $toggles = Array.from(document.querySelectorAll(".toggle"));
    const toggles = $toggles.map(el => new OSCToggle(el));


    // initialize ReactJS
    const controls = ReactDOM.createRoot(document.querySelector(".controls"));

    // render robot tooltips
    //RobotManager.render(root);

    controls.render(<>
        <Panel id="robot1" name="Robot 1">
            <Widget name="Position" addr="/robot1/pos">
                <Value tag="robot1 pos" subtag="x" label="X"></Value>
                <Value tag="robot1 pos" subtag="y" label="Y"></Value>
            </Widget>
            <Widget name="Quaternion" addr="/robot1/quat">
                <Value tag="robot1 quat" subtag="x" label="X"></Value>
                <Value tag="robot1 quat" subtag="y" label="Y"></Value>
                <Value tag="robot1 quat" subtag="z" label="Z"></Value>
                <Value tag="robot1 quat" subtag="w" label="W"></Value>
            </Widget>
        </Panel>
    </>);
}