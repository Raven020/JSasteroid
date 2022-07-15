//import { drawPlayer } from "./player.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//let acceleration = { x: 0, y: 0 };
let bullets = [];//array pf all bullets {x: pos, y: pos, velx: int, vely: int, rotation: deg} for each bullet
let asteroids = []; // array of all asteroids {x: pos, y: pos, velx: int, vely: int, rotation: deg}
let inertia = 0.99;
let rotation = 0;
let rotationSpeed = 3;
let asteroidSpeed = 3;
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
    ctx.clearRect(0, 0, width, height);// clear canvas
    drawAllBullets(); // draw bullets

    drawPlayer(); // draw player    
    drawAllAsteroids();


}

function drawAsteroid(index) {
    ctx.save();

    ctx.translate(asteroids[index].x, asteroids[index].y);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.lineTo(40, 20);
    ctx.lineTo(40, 40);
    ctx.lineTo(20, 60);
    ctx.lineTo(0, 60);
    ctx.lineTo(-20, 40);
    ctx.lineTo(-20, 20);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function updateAsteroid(index) {
    let asteroid = asteroids[index];
    asteroid.x += asteroid.velx;
    asteroid.y += asteroid.vely;
}


function drawAllAsteroids() {

    if (Math.random() < 0.01)// add asteroid
    {
        var randNum = Math.random(); // asteroids {x: pos, y: pos, velx: int, vely: int, rotation: deg}
        var asteroidDirection = randNum * 360;
        asteroids.push({
            x: randNum * width, y: randNum * height, velx: -Math.sin(-asteroidDirection * Math.PI / 180) * (randNum * asteroidSpeed),
            vely: -Math.cos(-asteroidDirection * Math.PI / 180) * (randNum * asteroidSpeed), rotation: randNum * 360
        });
    }
    for (var i = 0; i < asteroids.length; i++) {
        updateAsteroid(i);
        drawAsteroid(i);
    }
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
 * function to update the position of bullets, returns true if bullet is was incremented, false if bullet was popped
 * 
 * takes the index of a bullet in the bullets array
 * 
 */
function updateShot(index) {
    let bullet = bullets[index];
    if (inBounds(bullet.x, bullet.y)) {
        bullet.x += bullet.velx;
        bullet.y += bullet.vely;
        return true;//
    }
    else {
        //bullets.pop(index);
        bullets[index].x = -100;
        return false;
    }

}



/**
 * draws bullet
 * @param {*} i index of the bullet to be drawn 
 */
function drawBullet(i) {
    //console.log(bullets.length);

    ctx.beginPath();
    ctx.translate(bullets[i].x, bullets[i].y);
    ctx.rotate(bullets[i].brotation * Math.PI / 180);
    ctx.rect(0, 0, 5, 30);

    ctx.closePath();
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fill();
    ctx.stroke();
}
/**
 * function for drawing all the shots, updates the positiona and then draws them
 */
function drawAllBullets() {
    if (bullets.length > 0) {
        for (var i = bullets.length - 1; i >= 0; i--) {
            console.log("bullets length " + bullets.length);
            // if bullet not popped draw bullet
            updateShot(i)
            if (bullets[i].x != -100) {
                drawBullet(i);
            }
        }
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
 * pushes a bullet onto bullets array
 * @param {*} x start x position of a bullet 
 * @param {*} y start y position of a bullet
 * @param {*} rotation rotation of ship when bullet is fired, will be angle of bullet
 */
function pushBullet(x, y, rotation) {
    bullets.push({
        x: position.x, y: position.y, velx: -Math.sin(-rotation * Math.PI / 180) * bulletSpeed,
        vely: -Math.cos(-rotation * Math.PI / 180) * bulletSpeed, brotation: rotation
    });// if player is firing append new bullet to list
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
        pushBullet(position.x, position.y, rotation);
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