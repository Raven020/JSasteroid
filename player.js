export function drawPlayer(ctx) {
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


};

