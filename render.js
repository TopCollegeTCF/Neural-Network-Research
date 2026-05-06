class Render {
    document.addEventListener('DOMContentLoaded', async () => {
        console.log('🚀 Clash Royale - Stage 1');
        
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) {
            console.error('❌ Canvas не найден!');
            return;
        }
        
        // Установка размеров canvas
        canvas.width = window.CONFIG.GAME.width;
        canvas.height = window.CONFIG.GAME.height;
        const ctx = canvas.getContext('2d');
        
        // Инициализация Effects Manager
        if (window.Effects) {
            window.Effects.init(ctx);
        }
    }
    constructor(ctx) {
        this.ctx = ctx;
        this.images = {};
    }
     drawImage(x, y, w, h) {
        this.ctx.fillStyle = '#777';                                                            
        this.ctx.fillRect(x, y, w, h);
        this.ctx.fillStyle = '#fff';
    }
}
