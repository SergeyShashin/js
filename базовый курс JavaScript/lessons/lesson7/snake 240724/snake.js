'use strict';

const settings = {
  rowsCount: 18,
  colsCount: 18,
  snakeSpeed: 3,
  winFoodCount: 3,
};

const config = {
  settings,

  init(userSettings) {
    Object.assign(settings, userSettings)
  },

  getRowsCount() {
    return this.settings.rowsCount
  },

  getColsCount() {
    return this.settings.colsCount
  },

  getSnakeSpeed() {
    return this.settings.snakeSpeed
  },

  getWinFoodCount() {
    return this.settings.winFoodCount
  },

  validate(userSettings = {}) {
    const result = {
      validate: true,
      errors: [],
    }

    if (Object.keys(userSettings).length === 0) {
      return result
    }

    Object.keys(userSettings).map(param => {
      switch (param) {
        case 'rowsCount':
          if (userSettings['rowsCount'] > 30 || userSettings['colsCount'] < 5) {
            result.validate = false;
            result.errors.push('Количество строк может быть в диапазоне от 5 до 30.');
          }
          break;
        case 'colsCount':
          if (userSettings['colsCount'] > 30 || userSettings['colsCount'] < 5) {
            result.validate = false;
            result.errors.push('Количество колонок может быть в диапазоне от 5 до 30.');
          }
          break;
        case 'snakeSpeed':
          if (userSettings['snakeSpeed'] > 8 || userSettings['snakeSpeed'] < 1) {
            result.validate = false;
            result.errors.push('Скорость змейки может быть от 1 до 8.');
          }
          break;
        case 'winFoodCount':
          if (userSettings['winFoodCount'] > 10 || userSettings['winFoodCount'] < 1) {
            result.validate = false;
            result.errors.push('Количество еды для победы может быть от 1 до 8.');
          }
          break;
      }
    });

    return result;
  }

};

const snake = {

};

const map = {

};

const food = {

};

const statusGame = {

};

const game = {
  config,
  statusGame,
  snake,
  map,
  food,
  HTMLElementGame: null,
  HTMLElementButtons: null,

  init(userSettings = {}) {
    let validation = this.config.validate(userSettings);

    if (!validation.result) {
      validation.errors.map(error => console.error(error));
    }


    this.config.init(userSettings);
    this.HTMLElementGame = document.getElementById('snake-game');
    this.HTMLElementPlayOrStopButton = document.getElementById('playOrStopButton');
    this.HTMLElementNewGameButton = document.getElementById('newGameButton');

  }

};

window.onload = () => game.init({ snakeSpeed: 5 });
