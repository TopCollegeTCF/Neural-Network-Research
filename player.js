class Player{
  constructor(x, y, width, heigth){
    this.x: x;
    this.y: y;
    this.width = window.DATA.PLAYER.width;
    this.heigth = window.DATA.PLAYER.heigth
  }
}
window.Player = new Player();

updateMovement() {
  let newX = this.x;
  let newY = this.y;
  const keys = window.InputState.keys;
  if (keys.w) newY -= this.speed;
  if (keys.s) newY += this.speed;
  if (keys.a) newX -= this.speed;
  if (keys.d) newX += this.speed;

  if (newX >= CONFIG.bounds.xMin && newX <= CONFIG.bounds.xMax) {
      this.x = newX;
  }
  if (newY >= CONFIG.bounds.yMin && newY <= CONFIG.bounds.yMax) {
      this.y = newY;
  }
}
draw(ctx) {
    ctx.fillStyle = '#ffaa44';
    ctx.beginPath();
    ctx.arc(this.x + this.size / 2, this.y + this.size / 2, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x + this.size / 2 - 2, this.y + this.size / 2 - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    const keys = window.InputState.keys;
    ctx.fillStyle = '#ff6600';

    if (keys.w) ctx.fillRect(this.x + 15, this.y + this.size + 2, 10, 8);
    if (keys.s) ctx.fillRect(this.x + 15, this.y - 8, 10, 8);
    if (keys.a) ctx.fillRect(this.x + this.size + 2, this.y + 15, 8, 10);
    if (keys.d) ctx.fillRect(this.x - 8, this.y + 15, 8, 10);
}

getPosition() {
    return { x: this.x, y: this.y };
}

getScore() {
      return this.score;
  }
}

window.Player = new Player();
