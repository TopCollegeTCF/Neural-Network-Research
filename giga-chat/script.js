const player = document.getElementById('player');
let jumpHeight = 0;
let isJumping = false;

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    if (!isJumping && event.code === 'Space') {
        jump();
    }
}

function jump() {
    isJumping = true;
    const interval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(interval);
            fall();
        } else {
            jumpHeight += 10;
            player.style.bottom = `${jumpHeight}px`;
        }
    }, 10);
}

function fall() {
    const interval = setInterval(() => {
        if (jumpHeight <= 0) {
            clearInterval(interval);
            jumpHeight = 0;
            player.style.bottom = '0';
            isJumping = false;
        } else {
            jumpHeight -= 10;
            player.style.bottom = `${jumpHeight}px`;
        }
    }, 10);
}
