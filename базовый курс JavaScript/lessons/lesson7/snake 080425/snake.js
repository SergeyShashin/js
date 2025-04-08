'use strict';
const settings = {
  rowsCount: 21,
  colsCount: 21,
  winFoodCount: 5,
  speed: 5,
};

const config = {
  settings,

  init(usersettings) {
    Object.assign(this.settings, usersettings);
  },

  getRowsCount() {
    return this.settings.rowsCount
  },

  getColsCount() {
    return this.settings.colsCount
  },

  getWinFoodCount() {
    return this.settings.winFoodCount
  },

  getSpeed() {
    return this.settings.speed
  }
};

const status = {
  condition: null,
};

const snake = {
  body: null,
  direction: null,
  lastStepDirection: null,
  init(startBody) {
    this.body = startBody;
  }
};

const food = {
  point: null,
  init(point) {
    this.point = point
  }
};

const map = {
  cels: null,
  usedCels: null,
  gameEl: null,
  init(rowsCount, colsCount) {

  }
};

const game = {
  config,
  status,
  snake,
  food,
  map,
  numberInterval: null,

  init(userSettings = {}) {
    this.config.init(userSettings);
    console.log('Welcome World!');

  },

}

window.onload = game.init();