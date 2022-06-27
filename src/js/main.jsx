// imports
import * as ReactDOM from 'react-dom/client';
import React from 'react';

// managers
import EventManager from './managers/EventManager';
// views
import AdminView from './views/AdminView';
import Visualizer from './views/Visualizer';


window.onload = () => {
    // initialize managers
    EventManager.init();

    // root!
    const el = document.querySelector("#root");
    const root = ReactDOM.createRoot(el);

    // robot creation callback
    const createRobots = app => {
        app.create("robot1", "Robot 1", "#CA0000");
        app.create("robot2", "Robot 2", "#008DCA");
    };


    // decide on which view to render
    let view;
    if (el.classList.contains("admin")) {
        view = <AdminView onmount={createRobots} />
    } else if (el.classList.contains("visualizer")) {
        view = <Visualizer onmount={createRobots} />
    }


    // render
    root.render(view);
}