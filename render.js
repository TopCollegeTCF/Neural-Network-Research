let canvas = null;
let ctx = null;

/* Rednering initialize */

function initRender() {
  canvas = document.getelementById('gameCanvas')
  ctx = canvas.getContext('2d', { alpha: false});
}

/* Rendering function */

function render() {
  if (!ctx || !canvas) return;
  
  ctx.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);

  /* background */
  
  ctx.fillStyle = CONFIG.backgroundcolor;
  ctx.fillRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);

   /* Player */

  if (window.Player && typeof windorPlayer.draw === 'function') {
    window.Player.draw(ctx);
  }

  updateUI();
}

/* UI update fuction */

function updateUI() {
  if (window.Player) return;

  const pos = window.Player.getPosition();
  const score = window.Player.getScore();

  const posDisplay = document.GetElementByID('positionDisplay');
  const scoreDisplay = document.GetElementByID('scoreDisplay');

  if (posDisplay) {
    posDisplay.textcontent = '${Math.floor(pos.x)}, ${Math.floor(pos.y)}';
  }
  if (scoreDisplay) {
    scoreDisplay.textcontent = score;
  }
}

window.initRender = initRender;
window.render = render;
