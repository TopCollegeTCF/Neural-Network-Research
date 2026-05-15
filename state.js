// state.js

let animationId = null;
let isRunning = false;

// Объект состояния игры
const GameState = {
    // Состояние клавиш
    keys: {
        w: false,
        s: false,
        a: false,
        d: false
    },

    // Игрок
    player: {
        x: 400,
        y: 300,
        width: 40,
        height: 40,
        speed: 5
    },

    // Счёт
    score: 0,

    // Обновление логики
    update() {
        if (this.keys.w) {
            this.player.y -= this.player.speed;
        }

        if (this.keys.s) {
            this.player.y += this.player.speed;
        }

        if (this.keys.a) {
            this.player.x -= this.player.speed;
        }

        if (this.keys.d) {
            this.player.x += this.player.speed;
        }
    }
};

// Инициализация
function initState() {
    console.log('state.js инициализирован');

    // Нажатие клавиш
    window.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();

        if (key in GameState.keys) {
            GameState.keys[key] = true;
        }
    });

    // Отпускание клавиш
    window.addEventListener('keyup', (event) => {
        const key = event.key.toLowerCase();

        if (key in GameState.keys) {
            GameState.keys[key] = false;
        }
    });

    startGameLoop();
}

// Игровой цикл
function gameLoop() {
    if (!isRunning) return;

    // Обновляем GameState
    GameState.update();

    // Дополнительное обновление игрока
    if (
        window.Player &&
        typeof window.Player.updateMovement === 'function'
    ) {
        window.Player.updateMovement();
    }

    // Рендер
    if (
        window.render &&
        typeof window.render === 'function'
    ) {
        window.render();
    }

    animationId = requestAnimationFrame(gameLoop);
}

// Запуск цикла
function startGameLoop() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    isRunning = true;
    animationId = requestAnimationFrame(gameLoop);

    console.log('Игровой цикл запущен');
}

// Остановка цикла
function stopGameLoop() {
    isRunning = false;

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    console.log('Игровой цикл остановлен');
}

// Экспорт
window.GameState = GameState;
window.initState = initState;
window.stopGameLoop = stopGameLoop;
window.startGameLoop = startGameLoop;
