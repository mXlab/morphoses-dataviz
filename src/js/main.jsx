// managers
import EventManager from './managers/EventManager';
import App from './components/App';

import * as ReactDOM from 'react-dom/client';
import React from 'react';


window.onload = () => {
    // initialize managers
    EventManager.init();

    // root!
    const root = ReactDOM.createRoot(document.querySelector('#root'));

    // robot creation callback
    const createRobots = app => {
        app.create("robot1", "Robot 1", "#CA0000");
        app.create("robot2", "Robot 2", "#008DCA");
    }

    // render
    root.render(
        <App createRobots={createRobots} />
    )
}