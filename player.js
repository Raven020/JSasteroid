
class Player {
    constructor(width, height) {
        this.x = width / 2;
        this.y = height / 2;
    }


    drawPlayer() {
        ctx.save();// save ctx
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.clearRect(0, 0, 800, 800);
        ctx.translate(position.x, position.y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.moveTo(0, -15);
        ctx.lineTo(10, 10);
        ctx.lineTo(5, 7);
        ctx.lineTo(-5, 7);
        ctx.lineTo(-10, 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();


    }

    accelerate() {
        velocity.x -= Math.sin(-rotation * Math.PI / 180) * speed;
        velocity.y -= Math.cos(-rotation * Math.PI / 180) * speed;
    }
}
