// player.js
class Player {
    constructor(x, y, width, height, color = '#4CAF50') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    /**
     * Draw the player on the canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Optional: Add a border for better visibility
        ctx.strokeStyle = '#2E7D32';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Update player position based on keyboard input
     * @param {Object} keys - Object containing keyboard state
     * @param {number} speed - Movement speed in pixels per frame
     * @param {Object} bounds - Canvas boundaries {width, height}
     */
    move(keys, speed, bounds) {
        // Store the original position for collision detection
        let newX = this.x;
        let newY = this.y;

        // Handle horizontal movement
        if (keys.ArrowLeft || keys.KeyA || keys.a) {
            newX -= speed;
        }
        if (keys.ArrowRight || keys.KeyD || keys.d) {
            newX += speed;
        }

        // Handle vertical movement
        if (keys.ArrowUp || keys.KeyW || keys.w) {
            newY -= speed;
        }
        if (keys.ArrowDown || keys.KeyS || keys.s) {
            newY += speed;
        }

        // Apply boundary constraints
        this.x = Math.max(0, Math.min(newX, bounds.width - this.width));
        this.y = Math.max(0, Math.min(newY, bounds.height - this.height));
    }

    /**
     * Get player's bounding rectangle
     * @returns {Object} Rectangle bounds {x, y, width, height}
     */
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    /**
     * Check collision with another object
     * @param {Object} other - Other object with getBounds() method or bounds object
     * @returns {boolean} True if collision detected
     */
    collidesWith(other) {
        const bounds1 = this.getBounds();
        const bounds2 = other.getBounds ? other.getBounds() : other;
        
        return !(bounds2.x > bounds1.x + bounds1.width ||
                bounds2.x + bounds2.width < bounds1.x ||
                bounds2.y > bounds1.y + bounds1.height ||
                bounds2.y + bounds2.height < bounds1.y);
    }

    /**
     * Reset player position
     * @param {number} x - New X position
     * @param {number} y - New Y position
     */
    resetPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Create and expose a global instance
const globalPlayer = new Player(100, 100, 40, 40);

// Export the class for modular usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Player, globalPlayer };
}

// Make globally available in browser environment
if (typeof window !== 'undefined') {
    window.Player = Player;
    window.player = globalPlayer;
}