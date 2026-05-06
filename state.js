let animationId = null;
let isRunning = true;

function initState() {
    console.log('state.js инициализирован');
    startGameLoop();
}

function gameLoop() {
    if (!isRunning) return;

    if (window.Player && typeof window.Player.updateMovement === 'function') {
        window.Player.updateMovement();
    }

    if (window.render && typeof window.render === 'function') {
        window.render();
    }

    animationId = requestAnimationFrame(gameLoop);
}

function startGameLoop() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    isRunning = true;
    console.log("Игровой цикл запущен");
    animationId = requestAnimationFrame(gameLoop);
}

function stopGameLoop() {
    isRunning = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    console.log("Игровой цикл остановлен");
}

window.initState = initState;
window.stopGameLoop = stopGameLoop;
window.startGameLoop = startGameLoop;
