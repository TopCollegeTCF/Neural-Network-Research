// Проверка загрузки модулей
function checkDependencies() {
  var deps = [
    { name: 'getPlayer', obj: window.getPlayer },
    { name: 'updateInput', obj: window.updateInput }
  ];

  var allLoaded = true;

  for (var i = 0; i < deps.length; i++) {
    if (!deps[i].obj) {
      console.error('❌ ' + deps[i].name + ' не загружен');
      allLoaded = false;
    } else {
      console.log('✔ ' + deps[i].name + ' загружен');
    }
  }

  return allLoaded;
}

// Глобальный объект
window.GAME = {
  canvas: null,
  ctx: null,
  state: null
};

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.playerState = null;
    this.loopId = null;
  }

  start() {
    // Проверка зависимостей
    if (!checkDependencies()) {
      console.error('Игра не может быть запущена');
      return;
    }

    // Получаем canvas по id
    this.canvas = document.getElementById('gameCanvas');

    if (!this.canvas) {
      console.error('Canvas с id="gameCanvas" не найден');
      return;
    }

    this.ctx = this.canvas.getContext('2d');

    // Сохраняем в глобальный объект
    window.GAME.canvas = this.canvas;
    window.GAME.ctx = this.ctx;

    // Получаем начальное состояние игрока
    this.playerState = window.getPlayer();
    window.GAME.state = this.playerState;

    this.update();
  }

  update() {
    var self = this;

    function gameLoop() {
      // Обновление состояния
      self.playerState = window.updateInput();
      window.GAME.state = self.playerState;

      // Очистка
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);

      // Отрисовка
      self.drawPlayer();

      self.loopId = requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }

  drawPlayer() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      this.playerState.x,
      this.playerState.y,
      this.playerState.width,
      this.playerState.height
    );
  }

  stop() {
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);
      this.loopId = null;
    }
  }
}

// Главная функция инициализации
function initGame() {
  window.game = new Game();
  window.game.start();
}

// Запуск после загрузки страницы
window.addEventListener('DOMContentLoaded', initGame);

// Остановка при закрытии страницы
window.addEventListener('beforeunload', function () {
  if (window.game) {
    window.game.stop();
  }
});
