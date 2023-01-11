'use strict';

const settings = {
  winFoodCount: 20,
  rowsCount: 21,
  colsCount: 21,
  speed: 5
};

const config = {

  settings,


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
    return this.settings.winFoodCount;
  },

  init(usersettings) {
    Object.assign(this.settings, usersettings);

  }

};

const statusGame = {
  condition: null,
};

const map = {

};

const snake = {

};

const food = {

};

const game = {
  config,
  statusGame,
  map,
  snake,
  food,

  init(usersettings = {}) {
    this.config.init(usersettings);

    let validation = this.validation();

    if (!this.validation.isValid) {
      validation.errors.forEach(error => console.log(error));

      return
    }
  },

  validation() {
    let isValid = true;
    let errors = [];

    if (this.config.getRowsCount() < 5 || this.config.getRowsCount() > 30) {
      isValid = false;
      errors.push('Количество строк должно быть больше 5 или меньше 30');
    }

    if (this.config.getColsCount() < 5 || this.config.getColsCount() > 30) {
      isValid = false;
      errors.push('Количество колонок должно быть больше 5 или меньше 30');
    }

    if (this.config.getSpeed() < 3 || this.config.getSpeed() > 10) {
      isValid = false;
      errors.push('Скорость должна быть больше 3 или меньше 10');
    }

    if (this.config.getWinFoodCount() < 3 || this.config.getWinFoodCount() > 30) {
      isValid = false;
      errors.push('Скорость должна быть больше 3 или меньше 30');
    }

    return {
      isValid: isValid,
      errors: errors
    }
  }

};

window.onload = game.init({ speed: 800, rowsCount: 800 });