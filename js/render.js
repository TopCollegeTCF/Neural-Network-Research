function render() {
    const game = window.GAME;
    const canvas = game.canvas;
    const ctx = game.ctx || canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB'); 
    gradient.addColorStop(1, '#E0F7FA');   
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (window.player && typeof window.player.draw === 'function') {
        window.player.draw(ctx);
    }
    const score = game.score || 0;
    ctx.fillStyle = '#FFF';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textBaseline = 'top';
    ctx.strokeText(`Score: ${score}`, 10, 10);
    ctx.fillText(`Score: ${score}`, 10, 10);
}
