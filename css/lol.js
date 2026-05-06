// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 370,
    y: 550,
    width: 60,
    height: 60,
    color: "blue",
    dx: 5
};

let obstacles = [];
let obstacleFrequency = 2000; // New obstacle every 2 seconds
let gameOver = false;

// Function to draw the player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Function to draw obstacles
function drawObstacles() {
    ctx.fillStyle = "red";
    for (let obs of obstacles) {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
}

// Function to update the game
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();

    // Move obstacles down
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 5;

        // Check for collision with player
        if (obstacles[i].y + obstacles[i].height > player.y &&
            obstacles[i].y < player.y + player.height &&
            obstacles[i].x + obstacles[i].width > player.x &&
            obstacles[i].x < player.x + player.width) {
            gameOver = true;
            alert("Game Over!");
        }
    }

    // Remove off-screen obstacles
    obstacles = obstacles.filter(obs => obs.y < canvas.height);

    requestAnimationFrame(update);
}

// Move player with keyboard
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.dx;
    } else if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.dx;
    }
});

// Create a new obstacle
function createObstacle() {
    let width = Math.random() * 100 + 20;
    let x = Math.random() * (canvas.width - width);
    obstacles.push({
        x: x,
        y: 0,
        width: width,
        height: 20
    });
}

// Start the game
setInterval(createObstacle, obstacleFrequency);
update();
