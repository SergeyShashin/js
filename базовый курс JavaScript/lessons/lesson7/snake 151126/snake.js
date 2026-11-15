'use strict';

const settings = {
  colsCount: 10,
  rowsCount: 10,
  speedSnake: 3,
  amountFoodNeededFeelFull: 3
};

const config = {
  settings,

  init(userSettings) {
    Object.assign(this.settings, userSettings);
  },

  getColsCount() {
    return this.settings.colsCount;
  },

  getRowsCount() {
    return this.settings.rowsCount;
  },

  getSpeedSnake() {
    return this.settings.speedSnake;
  },

  getAmountFoodsNeededFeelFull() {
    return this.settings.amountFoodNeededFeelFull;
  },

  validation() {
    let isValid = true;
    let errors = [];

    for (let key in this.settings) {

      let value = this.settings[key];
      switch (key) {
        case 'colsCount':
          if (value < 5 || value > 20) {
            isValid = false;
            errors.push('Задумали количество колонок от 5 до 20');
          }
          break;
        case 'rowsCount':
          if (value < 5 || value > 20) {
            errors.push('Задумали количество сторок от 5 до 20');
            isValid = false;
          }
          break;
        case 'speedSnake':
          if (value < 1 || value > 10) {
            isValid = false;
            errors.push('Задумали скорость змейки от 1 до 10');
          }
          break;
        case 'amountFoodNeededFeelFull':
          if (value < 1 && value > 10) {
            isValid = false;
            errors.push('Задумали количество еды для змейки от 1 до 10');
          }
          break;
      }
    }

    return { isValid: isValid, errors: errors };
  }

};

const game = {
  config,
  init(userSettings) {
    this.config.init(userSettings);
    let validationConfig = this.config.validation();
    if (!validationConfig.isValid) {
      for (let error of validationConfig.errors) {
        console.error(error);
      }
      return alert('Переданные настройки отличаются от задуманных. Результат можно посмотреть в консоли разработчика браузера.');
    }
    console.log(this.config.getSpeedSnake());
  }
};

window.onload = () => game.init({ speedSnake: 5 })