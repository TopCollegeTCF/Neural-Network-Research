// state.js - Состояние игры и цикл обновления

// Основной объект состояния игры
const GameState = {
    // Состояние клавиш (WASD)
    keys: {
        w: false,
        s: false,
        a: false,
        d: false
    },

    // Позиция и размеры игрока
    player: {
        x: 400,
        y: 300,
        width: 40,
        height: 40
    },

    // Счёт игрока
    score: 0,

    // Скорость перемещения игрока (можно настраивать)
    playerSpeed: 5,

    /**
     * Метод обновления логики игры (вызывается каждый кадр)
     */
    update() {
        // Перемещение игрока по WASD
        if (this.keys['w'] && this.player.y > 0) {
            this.player.y -= this.playerSpeed;
        }
        if (this.keys['s'] && this.player.y < 600 - this.player.height) { // предполагаем высоту canvas 600
            this.player.y += this.playerSpeed;
        }
        if (this.keys['a'] && this.player.x > 0) {
            this.player.x -= this.playerSpeed;
        }
        if (this.keys['d'] && this.player.x < 800 - this.player.width) { // предполагаем ширину canvas 800
            this.player.x += this.playerSpeed;
        }
    }
};

// Экспортируем GameState в глобальную область (window)
window.GameState = GameState;

export default GameState;
