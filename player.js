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
