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

};

/**
 * @type {Object} Еда
 */
const food = {

};

/**
 * @type {Object} Статус
 */
const status = {

};

/**
 * @type {Object} Игра
 */
const game = {
  config,
  map,
  snake,
  food,
  status,

  init(userSettings){
    console.log('Змейка.');

  }

};

window.onload = () => game.init();
