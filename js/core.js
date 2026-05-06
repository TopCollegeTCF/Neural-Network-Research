class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.running = false;
        this.state = 'menu';
        this.dt = 0;
        this._lastTime = 0;
        this._rafId = null;

        this.World = window.World || null;
        this.Player = window.Player || null;
        this.EnemySystem = window.EnemySystem || null;
        this.WeaponSystem = window.WeaponSystem || null;
        this.ParticleSystem = window.ParticleSystem || null;
        this.UIManager = window.UIManager || null;
        this.SpriteLoader = window.SpriteLoader || null;
        this.Utils = window.Utils || null;
        this.CONFIG = window.CONFIG || {};

        this.world = null;
        this.player = null;
        this.enemies = null;
        this.weapons = null;
        this.particles = null;
        this.ui = null;

        this.gameTime = 0;
        this.score = 0;
        this.kills = 0;

        this.input = { up:false, down:false, left:false, right:false };

        this.camX = 0;
        this.camY = 0;

        this._resize();
        this._bindEvents();
    }

    _resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    _bindEvents() {
        window.addEventListener('resize', () => this._resize());

        window.addEventListener('keydown', (e) => {
            const k = e.key.toLowerCase();

            if (['arrowup','w'].includes(k)) this.input.up = true;
            if (['arrowdown','s'].includes(k)) this.input.down = true;
            if (['arrowleft','a'].includes(k)) this.input.left = true;
            if (['arrowright','d'].includes(k)) this.input.right = true;

            if (k === 'escape' || k === 'p') {
                if (this.state === 'playing') this.pause();
                else if (this.state === 'paused') this.resume();
            }

            if (['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d','escape','p'].includes(k)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            const k = e.key.toLowerCase();

            if (['arrowup','w'].includes(k)) this.input.up = false;
            if (['arrowdown','s'].includes(k)) this.input.down = false;
            if (['arrowleft','a'].includes(k)) this.input.left = false;
            if (['arrowright','d'].includes(k)) this.input.right = false;
        });

        this._bindTouch();
    }

    _bindTouch() {
        let sx = 0, sy = 0;
        const DEAD = 15;

        const move = (x,y) => {
            const dx = x - sx;
            const dy = y - sy;
            this.input.left = dx < -DEAD;
            this.input.right = dx > DEAD;
            this.input.up = dy < -DEAD;
            this.input.down = dy > DEAD;
        };

        this.canvas.addEventListener('touchstart', e => {
            const t = e.touches[0];
            sx = t.clientX;
            sy = t.clientY;
        }, { passive:true });

        this.canvas.addEventListener('touchmove', e => {
            const t = e.touches[0];
            move(t.clientX, t.clientY);
            e.preventDefault();
        }, { passive:false });

        this.canvas.addEventListener('touchend', () => {
            this.input = { up:false, down:false, left:false, right:false };
        });
    }

    startGame() {
        if (this.SpriteLoader) {
            this.SpriteLoader.load();
            this.SpriteLoader.onReady(() => this._start());
        } else {
            this._start();
        }
    }

    _start() {
        this.gameTime = 0;
        this.score = 0;
        this.kills = 0;

        Object.keys(this.input).forEach(k => this.input[k] = false);

        if (this.World) this.world = new this.World();
        if (this.Player) this.player = new this.Player();
        if (this.EnemySystem) this.enemies = new this.EnemySystem();
        if (this.WeaponSystem) this.weapons = new this.WeaponSystem();
        if (this.ParticleSystem) this.particles = new this.ParticleSystem();

        // пересоздаём UI (фикс бага состояния)
        if (this.UIManager) this.ui = new this.UIManager(this);

        if (this.player?.addWeapon) this.player.addWeapon('MAGIC_BOLT');

        this.ui?.showScreen('gameScreen');
        this.state = 'playing';

        this._startLoop();
    }

    _startLoop() {
        this.running = true;
        this._lastTime = performance.now();
        this._rafId = requestAnimationFrame(t => this._loop(t));
    }

    stopLoop() {
        this.running = false;
        if (this._rafId) cancelAnimationFrame(this._rafId);
    }

    _loop(t) {
        if (!this.running) return;

        this.dt = Math.min((t - this._lastTime)/1000, 0.05);
        this._lastTime = t;

        if (this.state === 'playing') {
            this._update();
        }

        this._draw();

        this._rafId = requestAnimationFrame(tt => this._loop(tt));
    }

    _update() {
        const dt = this.dt;
        this.gameTime += dt;

        if (this.CONFIG?.GAME_DURATION && this.gameTime >= this.CONFIG.GAME_DURATION) {
            this._victory();
            return;
        }

        this.player?.update(dt, this.input);

        if (!this.Utils) return;

        if (this.player && this.particles) {
            for (const gem of this.particles.xpGems) {
                if (gem.collected) continue;

                const d = this.Utils.dist(this.player.x, this.player.y, gem.x, gem.y);

                if (d < this.player.xpMagnetRadius) {
                    const a = this.Utils.angle(gem.x, gem.y, this.player.x, this.player.y);
                    gem.vx += Math.cos(a) * 200 * dt;
                    gem.vy += Math.sin(a) * 200 * dt;
                }

                if (d < this.player.radius + gem.r + 8) {
                    gem.collected = true;
                    this.score += gem.xp;
                    if (this.player.gainXp?.(gem.xp)) this._onLevelUp();
                }
            }
        }

        this.enemies?.update(dt, this.player, this.particles, this);

        if (this.weapons && this.enemies) {
            this.weapons.update(dt, this.player, this.enemies.enemies, this.particles, this);
        }

        this.particles?.update(dt);

        if (this.player && this.Utils) {
            this.camX = this.Utils.lerp(this.camX, this.player.x, this.CONFIG.CAM_LERP || 0.1);
            this.camY = this.Utils.lerp(this.camY, this.player.y, this.CONFIG.CAM_LERP || 0.1);
        }

        if (this.player?.hp <= 0) this._gameOver();
    }

    _draw() {
        const ctx = this.ctx;
        const W = this.canvas.width;
        const H = this.canvas.height;

        ctx.clearRect(0,0,W,H);

        this.world?.draw(ctx,this.camX,this.camY,W,H);
        this.enemies?.draw(ctx,this.camX,this.camY,W,H);
        this.weapons?.draw(ctx,this.camX,this.camY,W,H);
        this.particles?.draw(ctx,this.camX,this.camY,W,H);
        this.player?.draw(ctx,this.camX,this.camY,W,H);
    }

    pause() {
        this.state = 'paused';
        this.ui?.showScreen('pauseScreen');
    }

    resume() {
        this.state = 'playing';
        this.ui?.showScreen('gameScreen');
        this._lastTime = performance.now();
    }

    _gameOver() {
        this.state = 'gameover';
        this.stopLoop();
        this.ui?.showGameOver(this.player, this.gameTime, this.score, this.kills, false);
    }

    _victory() {
        this.state = 'victory';
        this.stopLoop();
        this.ui?.showGameOver(this.player, this.gameTime, this.score, this.kills, true);
    }
}

window.GAME = {
    instance:null,

    init() {
        this.instance = new Game();
        return this.instance;
    },

    start() {
        this.instance?.startGame();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.GAME.init());
} else {
    window.GAME.init();
}