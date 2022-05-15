'use strict';

/**
 * @type {Object} settings. Настройки игры змейки.
 * @property {number} rowsCount. Количество строк.
 * @property {number} colsCount. Количество колонок.
 * @property {number} speed. Сокорость змейки.
 * @property {number} winFoodCount. Количество еды для победы.
 */
const settings = {
  rowsCount: 10,
  colsCount: 10,
  speed: 5,
  winFoodCount: 50,
};

/**
 * @type {Object} config. Конфигурирование настроек. 
 *  
 */

const config = {
  settings,

  init(userSettings) {
    Object.assign(this.settings, userSettings);
  },

  getRowsCount() {
    return this.settings.rowsCount;
  },

  getColsCount() {
    return this.settings.colssCount;
  },

  getSpeed() {
    return this.settings.speed;
  },
  getWinFoodCount() {
    return this.settings.winFoodCount;
  },

  validation() {
    const result = {
      isValid: true,
      errors: []
    };

    if (this.settings.speed < 1 || this.settings.speed > 8) {
      result.isValid = false;
      result.errors.push('Скорость змейки должна быть больше 1 и меньше 8');
    }

    if (this.settings.rowsCount < 5 || this.settings.rowsCount > 20) {
      result.isValid = false;
      result.errors.push('Количество строк должно быть больше 5 и меньше 20');
    }

    if (this.settings.colsCount < 5 || this.settings.colsCount > 20) {
      result.isValid = false;
      result.errors.push('Количество колонок должно быть больше 5 и меньше 20');
    }

    if (this.settings.winFoodCount < 1 || this.settings.colsCount > 50) {
      result.isValid = false;
      result.errors.push('Количество строк должно быть больше 1 и меньше 50');
    }

    return result;
  }

};

/**
 *@type {Object} status. Статус игры.
 *@property {string} condition. Состояние игры.
 */
const status = {
  condition: null
};

/**
 * @type {Object} map. Игровое поле.
 */
const map = {

};

/**
 * @type {Object} snake. Змейка.
 */
const snake = {

};

/**
 * @type {Object} food. Еда.
 */
const food = {

};

/**
 * @type {Object} game. Управление игрой.
 */
const game = {
  config,
  map,
  status,
  snake,
  food,

  init(userSettings) {
    this.config.init(userSettings);
    
    let validation = this.config.validation();
    // console.log(validation);
    
    if (!validation.isValid) {
      for (let error of validation.errors) {
        console.error(error);
      }
      return;
    }    


  },



};

window.onload = () => game.init();