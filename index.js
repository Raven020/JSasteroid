//import Player from "player.js"

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//let acceleration = { x: 0, y: 0 };
let bullets = [];//array pf all bullets {x: pos, y: pos, velx: int, vely: int, rotation: deg} for each bullet
let inertia = 0.99;
let rotation = 0;
let rotationSpeed = 3;
let speed = 0.1;
let bulletSpeed = 3;
let velocity = { x: 0, y: 0 };
let width = innerWidth;
let height = innerHeight;
let position = { x: width / 2, y: height / 2 };
ctx.canvas.width = width;
ctx.canvas.height = height;


const keysDown = {
    up: false,
    left: false,
    down: false,
    right: false,
    fire: false
};



function animate() {
    window.requestAnimationFrame(animate);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased)
    checkKeys();
    // moving player
    if (!inBounds(position.x, position.y)) {
        velocity = { x: 0, y: 0 };
    }
    position.x += velocity.x;
    position.y += velocity.y;
    //inertia
    velocity.x *= inertia;
    velocity.y *= inertia;
    ctx.clearRect(0, 0, width, height);
    drawPlayer();
    drawShot();
    // while there are bullets draw shots


}

function drawPlayer() {
    ctx.save();// save ctx

    ctx.beginPath();

    ctx.translate(position.x, position.y);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.moveTo(0, -15);
    ctx.lineTo(10, 10);
    ctx.lineTo(5, 7);
    ctx.lineTo(-5, 7);
    ctx.lineTo(-10, 10);
    ctx.closePath();

    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 2;

    ctx.fill();
    ctx.stroke();
    ctx.restore();

}
/**
 * function to update the position of bullets
 * 
 * takes the index of a bullet in the bullets array
 * 
 */
function updateShot(index) {
    let bullet = bullets[index];
    if (inBounds(bullet.x, bullet.y)) {
        bullet.x += bullet.velx;
        bullet.y += bullet.vely;
    }
    else {
        console.log("popped " + index);
        bullets.pop(index);
    }

}

/**
 * function for drawing all the shots, updates the positiona and then draws them
 */
function drawShot() {
    if (bullets.length > 0) {
        //console.log(bullets.length);
        ctx.beginPath();
        for (let i = 0; i < bullets.length; i++) {


            console.log("drawing")

            //ctx.clearRect(0, 0, width, height);
            //ctx.translate(bullets[i].x, bullets[i].y);
            //ctx.rotate(bullets[i].rotation * Math.PI / 180);

            ctx.rect(bullets[i].x, bullets[i].y, 30, 5);
            //ctx.restore()
            //ctx.closePath();
            ctx.strokeStyle = '#ffffff';
            ctx.fillStyle = '#000000';
            ctx.lineWidth = 2;
            //ctx.closePath();
            //ctx.restore();
            updateShot(i)// update bullets positions
        }
        ctx.fill();
        ctx.stroke();


    }
}


function accelerate() {
    velocity.x -= Math.sin(-rotation * Math.PI / 180) * speed;
    velocity.y -= Math.cos(-rotation * Math.PI / 180) * speed;
}
/**
 * Returns true if an object is in bounds of the canvas
 * @param  x x coord of object
 * @param  y y coord of an object
 * @returns 
 */
function inBounds(x, y) {
    if (x + velocity.x > width || x + velocity.x < 0) {
        return false;
    }
    if (y + velocity.y > height || y + velocity.y < 0) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * function to check what keys are pressed and ensure that these actions occur
 */
function checkKeys() {
    if (keysDown.up) {
        accelerate()
    }
    if (keysDown.left) {
        rotation -= rotationSpeed;
        checkRotation();
    }
    if (keysDown.right) {
        rotation += rotationSpeed;
        checkRotation();
    }
    if (keysDown.fire) {
        bullets.push({ x: position.x, y: position.y, velx: -Math.sin(-rotation * Math.PI / 180) * bulletSpeed, vely: -Math.cos(-rotation * Math.PI / 180) * bulletSpeed, rotation: rotation });// if player is firing append new bullet to list
        keysDown.fire = false;
    }
}


function checkRotation() {
    if (rotation >= 360) {
        rotation -= 360;
    }
    else if (rotation < 0) {
        rotation += 360
    }


}



function keyPressed(e) {
    //console.log("Key Pressed " + e.keyCode);
    if (e.key === 'd') {
        keysDown.right = true;

    }
    if (e.key === 'a') {
        keysDown.left = true;

    }
    if (e.key === 'w') {
        keysDown.up = true;

    }
    if (e.key === 's') {
        keysDown.down = true;

    }
    if (e.key === 'f') {
        keysDown.fire = true;
    }


}

function keyReleased(e) {
    //console.log("Relased " + e.keyCode);
    if (e.key === 'd') {
        keysDown.right = false;
    }
    if (e.key === 'a') {
        keysDown.left = false;
    }
    if (e.key === 'w') {
        keysDown.up = false;
    }
    if (e.key === 's') {
        keysDown.down = false;
    }
}

window.requestAnimationFrame(animate);