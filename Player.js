class Player {
    constructor(config) {
        this.ctx = config.ctx//ctx
        this.position = { x: width / 2, y: height / 2 }// position
        this.velocity = { x: 0, y: 0 }//velocity
        this.rotation = 0//rotation
        this.inertia = 0.99;
    }
    getRotation() {
        return this.rotation;
    }
    accelerate(object) {


        this.velocity.x -= Math.sin(-this.rotation * Math.PI / 180) * speed;
        this.velocity.y -= Math.cos(-this.rotation * Math.PI / 180) * speed;




        if (this.position.x > width) this.position.x = 0;
        else if (this.position.x < 0) this.position.x = width;
        if (this.position.y > width) this.position.y = 0;
        else if (this.position.y < 0) this.position.y = height;
    }

    checkRotation() {
        if (this.rotation >= 360) {
            this.rotation -= 360;
        }
        else if (this.rotation < 0) {
            this.rotation += 360
        }


    }

    updatePlayer() {

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x *= this.inertia;
        this.velocity.y *= this.inertia;
    }


    drawPlayer() {
        this.updatePlayer();

        ctx.save();// save ctx

        ctx.beginPath();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation * Math.PI / 180);
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
}
