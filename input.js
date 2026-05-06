window.InputState = {
    keys: {
        w: false,
        s: false,
        a: false,
        d: false,
    },
    mouse: {
        x: 0,
        y: 0,
        leftButton: false,
        rightButton: false
    }
};

function initInput() {
    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        if (['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
            e.preventDefault();
        }

    
        if (key === 'w' || key === 'arrowup') window.InputState.keys.w = true;
        if (key === 's' || key === 'arrowdown') window.InputState.keys.s = true;
        if (key === 'a' || key === 'arrowleft') window.InputState.keys.a = true;
        if (key === 'd' || key === 'arrowright') window.InputState.keys.d = true;
    });

    window.addEventListener('keyup', (e) => {
        const key = e.key.toLowerCase();

        if (key === 'w' || key === 'arrowup') window.InputState.keys.w = false;
        if (key === 's' || key === 'arrowdown') window.InputState.keys.s = false;
        if (key === 'a' || key === 'arrowleft') window.InputState.keys.a = false;
        if (key === 'd' || key === 'arrowright') window.InputState.keys.d = false;
    });


    
    window.addEventListener('mousemove', (e) => {
        const canvas = document.getElementById('gameCanvas');
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        window.InputState.mouse.x = (e.clientX - rect.left) * scaleX;
        window.InputState.mouse.y = (e.clientY - rect.top) * scaleY;
    });

   
    window.addEventListener('mousedown', (e) => {
        if (e.button === 0) window.InputState.mouse.leftButton = true;
        if (e.button === 2) window.InputState.mouse.rightButton = true;
    });
    window.addEventListener('mouseup', (e) => {
        if (e.button === 0) window.InputState.mouse.leftButton = false;
        if (e.button === 2) window.InputState.mouse.rightButton = false;
    });

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
}
window.initInput = initInput;
