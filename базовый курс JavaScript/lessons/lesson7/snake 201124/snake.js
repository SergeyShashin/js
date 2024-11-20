'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  speed: 5,
  winFoodCount: 5
};

const config = {
  settings,
  init(userSettings) {
    Object.assign(this.settings, userSettings);
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
    return this.settings.winFoodCount
  },
  validate() {
    const result = {
      isValid: true,
      errors: []
    };

    if (this.getRowsCount() < 5 || this.getRowsCount() > 20) {
      result.isValid = false;
      errors.push(`RowsCount= ${this.getRowsCount()}, a может быть в диапазоне [5-20]`);
    };

    if (this.getColsCount() < 5 || this.getColsCount() > 20) {
      result.isValid = false;
      errors.push(`ColsCount = ${this.getColsCount()}, а может быть в диапазоне [5-20]`);
    };

    if (this.getSpeed() < 3 || this.getSpeed() > 10) {
      result.isValid = false;
      result.errors.push(`Speed = ${this.getSpeed()}, а может быть в диапазоне [3-10]`);
    };

    if (this.getWinFoodCount() < 1 || this.getWinFoodCount() > 20) {
      result.isValid = false;
      errors.push(`WinFoodCount=${this.getWinFoodCount()}, а может быть в диапазоне [1-20]`);
    };

    return result
  }
};

const map = {
  cells: null,
  usedCells: null,
};

const food = {
  x: null,
  y: null,
};

const snake = {
  body: null,
  direction: null,
  lastDirection: null
};

const status = {
  condition: null
};

const game = {
  config,
  map,
  food,
  snake,
  status,
  init(userSettings = {}) {
    this.config.init(userSettings);
    let validation = this.config.validate();
    if (!validation.isValid) {
      for (let error of validation.errors) {
        console.error(error);
      }
      return
    }
  }
};

window.onload = () => game.init({ speed: 500 });