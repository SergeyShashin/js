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
  }

};

/**
 * @type {Object} Еда
 */
const food = {

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

    this.reset();
  },

  reset() {
    snake.init(Math.round(this.config.getColsCount() / 2), Math.round(this.config.getRowsCount() / 2), 'up');
    // food.init()

    // map.init(this.config.getRowsCount, this.config.getColsCount);
  }

};

window.onload = () => game.init({ speed: 7 });
