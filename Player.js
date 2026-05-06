// player.js — отвечает за состояние и логику персонажа
export class Player {
    constructor(x = 380, y = 280) {
        this.x = x;
        this.y = y;
        this.speed = CONFIG.playerSpeed;
        this.size = CONFIG.playerSize;
        this.color = CONFIG.playerColor;

        this.score = 0;
    }

    updateMovement() {
        // Сохраняем старую позицию для проверки
        let newX = this.x;
        let newY = this.y;

        // Читаем состояние клавиш из InputState
        const keys = window.InputState.keys;

        // Движение по клавишам
        if (keys.w) newY -= this.speed;
        if (keys.s) newY += this.speed;
        if (keys.a) newX -= this.speed;
        if (keys.d) newX += this.speed;

        // Проверка границ
        if (newX >= CONFIG.bounds.xMin && newX <= CONFIG.bounds.xMax) {
            this.x = newX;
        }

        if (newY >= CONFIG.bounds.yMin && newY <= CONFIG.bounds.yMax) {
            this.y = newY;
        }
    }

    draw(ctx) {
        // Тело игрока
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);

        // Иллюминатор
        ctx.fillStyle = '#ffaa44';
        ctx.beginPath();
        ctx.arc(
            this.x + this.size / 2,
            this.y + this.size / 2,
            8,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Блик
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(
            this.x + this.size / 2 - 2,
            this.y + this.size / 2 - 2,
            2,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Эффект двигателей при движении
        const keys = window.InputState.keys;
        ctx.fillStyle = '#ff6600';

        if (keys.w) ctx.fillRect(this.x + 15, this.y + this.size + 2, 10, 8);
        if (keys.s) ctx.fillRect(this.x + 15, this.y - 8, 10, 8);
        if (keys.a) ctx.fillRect(this.x + this.size + 2, this.y + 15, 8, 10);
        if (keys.d) ctx.fillRect(this.x - 8, this.y + 15, 8, 10);
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    // Метод возвращает текущий счёт
    getScore() {
        return this.score;
    }
}
