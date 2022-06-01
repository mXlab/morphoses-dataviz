import EventRegister from './components/EventRegister';
import OSCToggle from './components/OSCToggle';

window.onload = () => {
    EventRegister.Init();

    // initialize components
    const $toggles = Array.from(document.querySelectorAll(".toggle"));
    const toggles = $toggles.map(el => new OSCToggle(el));
}