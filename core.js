// Проверка загрузки модулей
function checkDependencies() {
  var deps = [
    { name: 'getPlayer', obj: window.getPlayer },
    { name: 'updateInput', obj: window.updateInput }
  ];

  var allLoaded = true;

  for (var i = 0; i < deps.length; i++) {
    if (!deps[i].obj) {
      console.error('❌ ' + deps[i].name + ' не загружен');
      allLoaded = false;
    } else {
      console.log('✔ ' + deps[i].name + ' загружен');
    }
  }

  return allLoaded;
}
// Главная функция инициализации
function initGame() {
  window.initRender();
  window.initInput();
  window.initState();
}

// Запуск после загрузки страницы
window.addEventListener('DOMContentLoaded', initGame);

// Остановка игры при закрытии страницы
window.addEventListener('beforeunload', () => {
  if (window.stopGameLoop) {
    window.stopGameLoop();
  }
});
