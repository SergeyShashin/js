'use strict';

/**
 * @type {Object} settings Настройки игры
 * @property {Number} rowsCount количество строк
 * @property {Number} colsCount количество колонок
 * @property {Number} speed скорость змейки
 * @property {Number} quantityFoodForWin количество еды для победы
 */
const settings = {
  rowsCount: 10,
  colsCount: 10,
  speed: 5,
  quantityFoodForWin: 5
};

/**
 * @type {Object} config Конфиг игры
 * @property {Object} settings
 */
const config = {
  settings,
  getRowsCount() {
    return this.settings.rowsCount
  },
  getColsCount() {
    return this.settings.colsCount
  },
  getSpeed() {
    return this.settings.speed
  },
  getQuantityForWin() {
    return this.settings.quantityFoodForWin
  },
};

/**
 * @type {Object} Карта
 * @property {Object} cels объект, содержащий все html элементы игры
 * @property {Object} usedCels Объект, содержащий задействованные html элементы игры
 */
const map = {
  cels: null,
  usedCels: null
};

/**
 * @type {Object} Змейка
 * @property {Array} body Тело змейки
 * @property {String} direction Направление движения змейи
 * @property {String} lastDirection Направление движения змейки в момент смены направления
 */
const snake = {
  body: null,
  direction: null,
  lastDirection: null
};

/**
 * @type {Object} Еда
 * @property {Number} x Номер колонки в которой находится еда
 * @property {Number} y Номер строки в которой находится еда
 */
const food = {
  x: null,
  y: null
};

/**
 * @type {Object} Игра
 * @property {HTMLelement} gameElement элемент игры
 * @property {Number} tickInterval Код интервала при использовании функции setInterval
 */
const game = {
  config,
  map,
  snake,
  food,
  gameElement: null,
  tickInterval: null,
  init(userSettings = {}) {
    console.log('Старт игры.');

  }
}

window.onload = () => game.init();