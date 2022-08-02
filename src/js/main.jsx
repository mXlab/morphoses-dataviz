// imports
import * as ReactDOM from 'react-dom/client';
import React from 'react';

// managers
import EventManager from './managers/EventManager';
// views
import AdminView from './views/AdminView';
import VisualizerView from './views/VisualizerView';
// data
import registry from './registry';


window.onload = () => {
    // initialize managers
    EventManager.init();

    // root!
    const el = document.querySelector("#root");
    const root = ReactDOM.createRoot(el);


    // decide on which view to render
    let view;
    if (document.body.classList.contains("admin")) {
        view = <AdminView registry={registry} />
    } else if (document.body.classList.contains("visualizer")) {
        view = <VisualizerView registry={registry.robots} />
    }


    // render
    root.render(view);
}