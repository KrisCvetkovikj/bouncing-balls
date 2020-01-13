"use strict";

const canvas = document.getElementById('container');
const ctx = canvas.getContext('2d');
const coordinates = [];
const radius = 15;
const gravity = 0.2;
const damping = 0.9;
const traction = 0.8;

const draw = () => {
    let animationFrame = requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    coordinates.forEach(c => {
        ctx.beginPath();
        ctx.fillStyle = c.color;

        ctx.arc(c.x, c.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        if (c.x + radius >= canvas.width) {
            c.vx = -c.vx * damping;
            c.x = canvas.width - radius;
        } else if (c.x - radius <= 0) {
            c.vx = -c.vx * damping;
            c.x = radius;
        }
        if (c.y + radius >= canvas.height) {
            c.vy = -c.vy * damping;
            c.y = canvas.height - radius;
            // traction here
            c.vx *= traction;
        } else if (c.y - radius <= 0) {
            c.vy = -c.vy * damping;
            c.y = radius;
        }

        c.vy += gravity;


        c.x += c.vx;
        c.y += c.vy;

        //TODO: collision detection between balls
    });
};

requestAnimationFrame(draw);

document.addEventListener('click', (event) => coordinates.push({
    x: event.clientX,
    y: event.clientY,
    dx: 0,
    dy: -100,
    vx: Math.random() * 8 + 4,
    vy: -Math.random() * 4 + 2,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16)
}), false);
