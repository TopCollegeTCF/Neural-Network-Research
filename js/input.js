// input.js

// Инициализация состояния клавиш, если его ещё нет
if (!window.GAME) {
  window.GAME = {};
}

if (!window.GAME.keys) {
  window.GAME.keys = {
    w: false,
    a: false,
    s: false,
    d: false,
  };
}

// Список игровых клавиш
const gameKeys = new Set(["w", "a", "s", "d"]);

// Приведение key к нормализованному виду
function normalizeKey(e) {
  return e.key.toLowerCase();
}

// Обработчик нажатия клавиши
function handleKeyDown(e) {
  const key = normalizeKey(e);

  if (gameKeys.has(key)) {
    e.preventDefault();
    window.GAME.keys[key] = true;
  }
}

// Обработчик отпускания клавиши
function handleKeyUp(e) {
  const key = normalizeKey(e);

  if (gameKeys.has(key)) {
    e.preventDefault();
    window.GAME.keys[key] = false;
  }
}

// Инициализация input системы
export function initInput() {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}