'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  snakeSpeed: 5,
  winFoodCount: 5,
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
  getSnakeSpeed() {
    return this.settings.snakeSpeed;
  },
  getWinFoodCount() {
    return this.winFoodCount;
  },
  validation() {
    let result = {
      isValid: true,
      errors: []
    };

    if (this.getRowsCount() < 5 || this.getRowsCount() > 21) {
      result.isValid = false;
      errors.push('Количество строк [5-21].');
    }

    if (this.getColsCount() < 5 || this.getColsCount() > 21) {
      result.isValid = false;
      errors.push('Количество колонок [5-21].');
    }

    if (this.getSnakeSpeed() < 3 || this.getSnakeSpeed() > 9) {
      result.isValid = false;
      result.errors.push('Скорость змейки [3-9].');
    }

    if (this.getWinFoodCount() < 3 || this.getWinFoodCount() > 15) {
      result.isValid = false;
      errors.push('Количество еды для змейки [3-15].');
    }

    return result

  }

};

const map = {
  gameEl: null,
  init(rowsCount, colsCount) {
    this.gameEl = document.getElementById('snake-game');
  }
};

const game = {
  config,
  init(userSettings = {}) {
    console.log('WELCOME WORLD!)');
    this.config.init(userSettings);
    let validation = this.config.validation();
    if (!validation.isValid) {
      for (let error of validation.errors) {
        console.error(error);
      }
      return
    }
    console.log('Инициализируем змейку');
  },

};

window.onload = () => game.init({ snakeSpeed: 7 });