class Bullet {
    constructor(config) {
        this.speed = 3;
        this.position = config.position;
        this.velocity = config.velocity;
        this.rotation = config.rotation;
    }

    updateBullet() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    /**
    * draws bullet
    */
    drawBullet() {
        //console.log(bullets.length);
        ctx.beginPath();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.rect(0, 0, 5, 30);

        ctx.closePath();
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fill();
        ctx.stroke();
    }
}