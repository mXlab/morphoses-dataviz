var socket = io();

socket.on('/xyz', msg => {
    document.querySelector('.ball').style.left = `${msg[0] * 100}%`;
    document.querySelector('.ball').style.top =  `${(1 - msg[1]) * 100}%`;
});