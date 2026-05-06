class Game{
  constructor(){
    this.canvas = null;
    this.ctx = null;
    this.player = null;
    this.lastTime = 0;
    this.gameState = null;
    this.graphics = null
    this.soundFX = null
    this.ui = null
    this.ai = null
    this.animationId = null
    this.player = null
  }

  start(){
    this.canvas = window.Render();
    this.ctx = this.canvas.init();
    this.player = window.Player();
  }

  update(){
    const gameLoop = () => {
      this.ctx.draw();
      requestAnimationFrame(gameLoop);
    }
    gameLoop();
  }
}

const game = new Game();
game.start()


function checkDependencies() {
  const deps = [
    {name: 'CONFIG', obj: window.CONFIG},
    {name: 'InputState', obj: window.InputeState},
    {name: 'Player', obj: window.Player},
    {name: 'initRender', obj: window.initRender},
    {name: 'render', obj: window.render},
    {name: 'initState', obj: window.initState},
    {name: 'initInput', obj: window.initInput},
  ]

  let allLoadet = true

  for (const dep of deps) {
    if (!dep.obj) {
      console.error("Ошибка: ${dep.name} не загружен");
      allLoadet = false;
    }
    else{
      console.log('${dep.name} загружен0');
    }
  }
  return allLoadet
}

function initGame(){
  window.initRender();
  window.initInput();
  window.initState();
}


window.addEventListener('DOMContentLoader', initGame);

window.addEventListener('beforeunlode', () => {
  if (window.stopGameLoop){
    window.stopGameLoop();
  }
})
