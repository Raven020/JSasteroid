//import { drawPlayer } from "./player.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//let acceleration = { x: 0, y: 0 };
let bullets = [];//array pf all bullets {x: pos, y: pos, velx: int, vely: int, rotation: deg} for each bullet
let asteroids = []; // array of all asteroids {x: pos, y: pos, velx: int, vely: int, rotation: deg}
let inertia = 0.99;

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
//let player = { position: }
let player = new Player({ context: ctx });
//const asteroid = new Asteroidclass({ name: "raven" });

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

    ctx.clearRect(0, 0, width, height);// clear canvas
    checkForCollisions();
    drawAllBullets(); // draw bullets
    player.drawPlayer(); // draw player    
    drawAllAsteroids();

    cleanArrays(bullets);// clean arrays for bullets that are out of bounds
    //cleanArrays(asteroids);

}

/**
 * function to clean arrays if they have objects that are out of bounds
 * 
 * @param array the array that is to be cleaned
 * 
 */
function cleanArrays(array) {
    let index = 0;
    for (let item of array) {
        if (!inBounds(item)) {
            array.splice(index, 1);
        }
        index++;
    }
}




/**
 * function to update the position of an object e.g a bullet or an asteroid
 * @param {*} item 
 */
function updateObject(item) {
    item.x += item.velx;
    item.y += item.vely;
}


function checkForCollisions() {
    // iterate tthorugh all asteroids
    // if bullet is incontact with asteroid delete asteroid and bullet (may need to add to delete boolean for the objects)

    for (let bullet of bullets) {
        for (let asteroid of asteroids) {
            if ((bullet.position.x > asteroid.x && bullet.position.x < asteroid.x + 60) &&
                bullet.position.y > asteroid.y && bullet.position.y < asteroid.y + 60) {
                console.log("COLLISION!!");
                asteroid.x = -100;
                bullet.position.x = -100;
            }
        }
    }
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
        //updateAsteroid(i);
        updateObject(asteroids[i]);
        drawAsteroid(i);
    }
}


/**
 * function for drawing all the shots, updates the positiona and then draws them
 */
function drawAllBullets() {
    if (bullets.length > 0) {
        for (let i = 0; i < bullets.length; i++) {
            console.log("bullets length " + bullets.length);
            bullets[i].updateBullet();
            bullets[i].drawBullet();

        }
    }
}


/**
 * Returns true if an object is in bounds of the canvas
 * @param  x x coord of object
 * @param  y y coord of an object
 * @returns 
 */
function inBounds(item) {
    let x = item.position.x;
    let y = item.position.y;
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
function pushBullet() {
    bullet = new Bullet({
        position: {
            x: player.position.x, y: player.position.y

        }, velocity: {
            x: -Math.sin(-player.rotation * Math.PI / 180) * bulletSpeed,
            y: -Math.cos(-player.rotation * Math.PI / 180) * bulletSpeed
        },
        rotation: player.rotation
    });

    bullets.push(bullet);
}
/**
 * function to check what keys are pressed and ensure that these actions occur
 */
function checkKeys() {
    if (keysDown.up) {
        player.accelerate()
    }
    if (keysDown.left) {
        player.rotation -= rotationSpeed;
        player.checkRotation();
    }
    if (keysDown.right) {
        player.rotation += rotationSpeed;
        player.checkRotation();
    }
    if (keysDown.fire) {
        pushBullet();
        keysDown.fire = false;
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