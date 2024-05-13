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
  init(userSettings) {
    Object.assign(this.settings, userSettings);
  },

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
  }
};

/**
 * @type {Object} Карта
 * @property {Object} cels объект, содержащий все html элементы игры
 * @property {Object} usedCels Объект, содержащий задействованные html элементы игры
 */
const map = {
  cels: null,
  usedCels: null,
  init(gameElement, rows, cols) {
    this.cels = {};
    this.usedCels = [];
    for (let row = 0; row < rows; row++) {
      let tr = document.createElement('tr');
      gameElement.appendChild(tr);
      for (let col = 0; col < cols; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        this.cels[`x${col}_y${row}`] = td;
      }
    }
    console.log(this.cels);
  }
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
    let validateUserSettings = this.validation(userSettings);

    if (!validateUserSettings.isCorrect) {
      for (let error of validateUserSettings.errors) {
        console.error(error);
      }
      return
    }

    this.config.init(userSettings);
    this.gameElement = document.getElementById('snake-game');
    this.map.init(this.gameElement, this.config.getRowsCount(), this.config.getColsCount());
  },

  validation(userSettings) {
    const result = {
      isCorrect: true,
      errors: []
    }

    for (let parametr in userSettings) {
      switch (parametr) {
        case 'speed':
          if (userSettings[parametr] > 10 || userSettings[parametr] < 1) {
            result.isCorrect = false;
            result.errors.push('Скорость должна быть в дипазоне [от 2 до 9].');
          }
          break;
        case 'rowsCount':
          if (userSettings[parametr] > 5 || userSettings[parametr] < 30) {
            result.isCorrect = false;
            result.errors.push('Количество строк должно быть в дипазоне [от 5 до 30].');
          }
          break;
        case 'colsCount':
          if (userSettings[parametr] > 5 || userSettings[parametr] < 30) {
            result.isCorrect = false;
            result.errors.push('Количество колонок должно быть в дипазоне [от 5 до 30].');
          }
          break;
        case 'quantityFoodForWin':
          if (userSettings[parametr] > 2 || userSettings[parametr] < 10) {
            result.isCorrect = false;
            result.errors.push('Количество еды для победы должно быть в дипазоне [от 5 до 30].');
          }
          break;
      }
    }
    return result

  }
}

window.onload = () => game.init({ speed: 7 });