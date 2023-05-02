'use strict';

/**
 * @type {Object} Настройки игры
 */
const settings = {
  rowsCount: 10,
  colsCount: 10,
  speed: 5,
  winFoodCount: 5
};

/**
 * @type {Object} Конфиг. Отдаёт и устанавливает настройки игры.
 */
const config = {
  settings,

  /**
   * Инициализация конфигурации
   * @param {Object} userSettings Настройки от пользователя
   */
  init(userSettings) {
    this.settings = Object.assign(this.settings, userSettings);
  },

  validate() {
    let flag = true;
    let errors = [];

    if (this.getRowsCount() < 5 || this.getRowsCount() > 30) {
      errors.push('Количество строк должно быть больше 5 и меньше 30.');
    }

    if (this.getColsCount() < 5 || this.getColsCount() > 30) {
      errors.push('Количество колонок должно быть больше 5 и меньше 30.');
    }

    if (this.getSpeed() < 3 || this.getSpeed() > 10) {
      errors.push('Скорость должна быть больше 3 и меньше 10.');
    }

    if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 20) {
      errors.push('Количество еды для победы должно быть больше 5 и меньше 20.');
    }

    if (errors.length > 0) {
      flag = false;
    }

    return {
      flag: flag,
      errors: errors
    }

  },

  /**
   * Возвращает количество строк
   */
  getRowsCount() {
    return this.settings.rowsCount
  },

  /**
   * Возвращает количество колонок
   */
  getColsCount() {
    return this.settings.colsCount
  },

  /**
   * Возвращает количество еды, которое нужно съесть для завершения игры
   */
  getWinFoodCount() {
    return this.settings.winFoodCount
  },

  /**
   * Возвращает скорость
   */
  getSpeed() {
    return this.settings.speed
  },
};

/**
 * @type {Object} Карта
 */
const map = {
  cells: {},
  usedCells: [],
  gameElement: null,

  /**
   * Инициализация карты
   */
  init(rowsCount, colsCount, snakeBody, coordinatesFood) {
    this.gameElement = document.getElementById('snake-game');
    this.gameElement.innerHTML = '';
    for (let row = 0; row < rowsCount; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < colsCount; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        this.cells[`x${row}_y${col}`] = td;
        if (col === snakeBody[0].x && row === snakeBody[0].y) {
          td.classList.add('snake-head');
        }
        if (col === coordinatesFood.x && row === coordinatesFood.y) {
          td.classList.add('food');
        }
      }
      this.gameElement.appendChild(tr);
    }
  },

  /**
   * 
   * @returns Возвращает объект со всеми ячейками игрового поля
   */
  getCells() {
    return this.cells
  },

  /**
   * 
   * @returns Возвращает массив с занятыми ячейками игрового поля
   */
  getUsedCells() {
    return this.usedCells;
  },

  setUsedCells(point) {
    this.usedCells.push(point);
  }
};

/**
 * @type {Object} Змейка
 */
const snake = {
  body: [],
  direction: null,
  lastDirection: null,

  /**
   * Инициализация змейки
   * @param {Number} startPositionX Стартовое положение змейки по 'X'
   * @param {Number} startPositionY Стартовое положение змейки по 'Y'
   * @param {String} direction Стартовое направление змейки
   */
  init(startPositionX, startPositionY, direction) {
    this.body.push({ x: startPositionX, y: startPositionY });
    this.direction = direction;
    this.lastDirection = direction;
  },

  /**
   * 
   * @returns {Array} Возвращает координаты тела змейки
   */
  getBody() {
    return this.body
  },

  /**
   * 
   * @returns {String} Возвращает направление змейки
   */
  getDirrection() {
    return this.direction
  }

};

/**
 * @type {Object} Еда
 */
const food = {
  x: null,
  y: null,

  init(startPosition) {
    this.x = startPosition.x;
    this.y = startPosition.y;
  },

  getFood() {
    return { x: this.x, y: this.y }
  }

};

/**
 * @type {Object} Статус
 */
const statusGame = {

};

/**
 * @type {Object} Игра
 */
const game = {
  config,
  map,
  snake,
  food,
  statusGame,

  /**
   * Инициализация игры
   * @param {Object} userSettings Пользовательские настройки 
   */
  init(userSettings) {
    this.config.init(userSettings);

    let validation = this.config.validate();
    if (!validation.flag) {
      validation.errors.forEach(error => console.error(error));
      return
    }
    this.snake.init(Math.round(this.config.getColsCount() / 2), Math.round(this.config.getRowsCount() / 2), 'up');
    this.map.setUsedCells(this.snake.getBody()[0]);
    this.food.init(this.getRandomFreeCoordinates());
    this.map.setUsedCells(this.food.getFood());

    map.init(this.config.getRowsCount(), this.config.getColsCount(), this.snake.getBody(), this.food.getFood());
  },


  /**
   * 
   * @returns {Object} Возвращает объект со свободными x и y
   */
  getRandomFreeCoordinates() {

    while (true) {
      const randomPoint = {
        x: Math.round(Math.random() * this.config.getRowsCount()),
        y: Math.round(Math.random() * this.config.getColsCount())
      };

      if (!this.map.getUsedCells().some(usedPoint => usedPoint.x === randomPoint.x && usedPoint.y === randomPoint.y)) {
        return randomPoint;
      }
    }

  }

};

window.onload = () => game.init({ speed: 7 });
