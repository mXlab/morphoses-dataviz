// imports
import * as ReactDOM from 'react-dom/client';
import React from 'react';

// managers
import EventManager from './managers/EventManager';
// views
import AdminView from './views/AdminView';
import VisualizerView from './views/VisualizerView';


window.onload = () => {
    // initialize managers
    EventManager.init();

    // root!
    const el = document.querySelector("#root");
    const root = ReactDOM.createRoot(el);

    const registry = [
        {
            id: "robot1",
            name: "Robot 1",
            color: "#CA0000"
        },
        {
            id: "robot2",
            name: "Robot 2",
            color: "#008DCA"
        }
    ];


    // decide on which view to render
    let view;
    if (document.body.classList.contains("admin")) {
        view = <AdminView registry={registry} />
    } else if (document.body.classList.contains("visualizer")) {
        view = <VisualizerView registry={registry} />
    }


    // render
    root.render(view);
}