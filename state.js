// state.js

const GameState = {
    // Состояние клавиш
    keys: {
        w: false,
        s: false,
        a: false,
        d: false
    },

    // Позиция игрока
    player: {
        x: 400,
        y: 300,
        width: 40,
        height: 40,
        speed: 5
    },

    // Счёт игрока
    score: 0,

    // Метод обновления логики
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

// Экспорт в window
window.GameState = GameState;
