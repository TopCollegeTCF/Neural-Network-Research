class Input {
    constructor() { this.reset(); }

    reset() {
        this.isMoving   = false;
        this.keys = { up:false, down:false, left:false, right:false };
    }

    movement(input) {
        let dx = 0, dy = 0;
        if (input.up   || input.w) dy -= 1;
        if (input.down || input.s) dy += 1;
        if (input.left || input.a) dx -= 1;
        if (input.right|| input.d) dx += 1;


        const moving = dx !== 0 || dy !== 0;
        this.isMoving = moving;

        if(moving){
            return dx, dy;
        }
        return false;
    }

}

window.Input = Input;