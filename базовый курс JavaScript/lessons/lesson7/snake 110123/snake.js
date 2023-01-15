'use strict';

const settings = {
  rowsCount: 21,
  colsSount: 21,
  speed: 5,
  winFoodCount: 10,
};

const config = {
  settings,

  init(userSettings) {
    this.settings = Object.assign(this.settings, userSettings);
  },

  getRowsCount() {
    return this.settings.rowsCount;
  },

  getColsCount() {
    return this.settings.colsCount;
  },

  getSpeed() {
    return this.settings.speed;
  },

  getWinFoodCount() {
    return this.settings.speed;
  },

  validate() {

  },

};

const status = {
  condition: null,
  isPlay() {
    return this.condition === 'play';
  },
  isStop() {
    return this.condition === 'stop';
  },

};

const map = {

};

const snake = {

};

const food = {

};

const game = {
  config,
  status,
  map,
  snake,
  food,

  init(userSettings = {}) {
    this.config.init(userSettings);

  },

};

window.onload = game.init({ speed: 3 });
