'use strict';
const settings = {
  rowsCount: 21,
  colsCount: 21,
  winFoodCount: 1,
  speed: 1,
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
  },

  validate() {
    const result = {
      isValid: true,
      errors: []
    }

    if (this.settings.rowsCount > 21) {
      result.isValid = false;
      result.errors.push('Может быть высоту поля выбрать менее 22?');
    }

    if (this.settings.rowsCount < 5) {
      result.isValid = false;
      result.errors.push('Может быть высоту поля выбрать более 4?');
    }

    if (this.settings.colsCount > 21) {
      result.isValid = false;
      result.errors.push('Может быть ширину поля выбрать менее 22?');
    }

    if (this.settings.colsCount < 5) {
      result.isValid = false;
      result.errors.push('Может быть ширину поля выбрать более 4?');
    }

    if (this.settings.winFoodCount > 15) {
      result.isValid = false;
      result.errors.push('Может быть количество еды выбрать менее 16?');
    }

    if (this.settings.winFoodCount < 1) {
      result.isValid = false;
      result.errors.push('Может быть количество еды выбрать более 1?');
    }

    if (this.settings.speed > 10) {
      result.isValid = false;
      result.errors.push('Может быть скорость выбрать менее 11?');
    }

    if (this.settings.speed < 1) {
      result.isValid = false;
      result.errors.push('Может быть скорость выбрать более 1?');
    }

    return result
  }
};

const statusGame = {
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
  statusGame,
  snake,
  food,
  map,
  numberInterval: null,

  init(userSettings = {}) {
    this.config.init(userSettings);
    console.log('Welcome World!');
    let validation = this.config.validate();

    if (!validation.isValid) {
      for (let errorMsg of validation.errors) {
        console.error(errorMsg);
      }
      return
    };

  },

}

window.onload = game.init({ winFoodCount: 5, speed: 3 });