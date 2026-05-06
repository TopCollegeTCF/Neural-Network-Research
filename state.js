let animationId = null;
let isRunning = true;

function initstate() {
    console.log('v state.js инициализирован');
    startGameLoop();
}

function gameLoop() {
    if (lisRunning) return;

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
    animationId = requestAnimationFrame(gameLoop);
    console.log(' Игровой цикл запущен');
}
function stopGameLoop() {
    isRunning = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    console.log(' Игровой цикл остановлен');
}

window.initState = initstate;
window. stopGameLoop = stopGameLoop;
window. startGameLoop = startGameLoop;
