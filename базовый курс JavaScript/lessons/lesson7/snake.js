'use strict';

/**
 * @type {Object} settings. Настройки игры змейки.
 * @property {number} rowsCount. Количество строк.
 * @property {number} colsCount. Количество колонок.
 * @property {number} speed. Сокорость змейки.
 * @property {number} winFoodCount. Количество еды для победы.
 */
const settings = {
  rowsCount: 20,
  colsCount: 20,
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
    return this.settings.colsCount;
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
 *@type {Object} gameStatus. Статус игры.
 *@property {string} condition. Состояние игры.
 */
const gameStatus = {
  condition: null,

  init() {
    this.condition = 'play';
  },

  setPlay() {
    this.condition = 'play';
  },

  setStop() {
    this.condition = 'stop';
  },

  setFinish() {
    this.condition = 'finish';
  },

  IsPlay() {
    return this.condition === 'play';
  },

  IsStop() {
    return this.condition === 'stop';
  },
};

/**
 * @type {Object} map. Игровое поле.
 */
const map = {
  cels: null,
  usedCels: null,

  init(rowsCount, colsCount) {
    this.cels = {};
    this.usedCels = [];

    let gameElement = document.getElementById('snake-game');
    gameElement.innerHTML = '';

    for (let row = 0; row < rowsCount; row++) {
      let tr = document.createElement('tr');
      gameElement.appendChild(tr);
      for (let col = 0; col < colsCount; col++) {
        let td = document.createElement('td');
        this.cels[`x${col}_y${row}`] = td;
        tr.appendChild(td);
      }
    }
  },

  render(snakePointsArray, foodPoint) {
    this.usedCels.forEach(cell => {
      cell.className = '';
    });

    this.usedCels = [];

    snakePointsArray.forEach((snakePoint, idx) => {
      let snakeCell = this.cels[`x${snakePoint.x}_y${snakePoint.y}`];
      snakeCell.className = idx === 0 ? 'snake-head' : 'snake-body';
      this.usedCels.push(snakeCell);
    });

    let foodCell = this.cels[`x${foodPoint.x}_y${foodPoint.y}`];
    this.usedCels.push(foodCell);
    foodCell.className = 'food';
  }


};

/**
 * @type {Object} snake. Змейка.
 */
const snake = {
  body: null,
  direction: null,
  lastStepDirection: null,

  init(startBody, direction) {
    this.body = startBody;
    this.direction = direction;
    this.lastStepDirection = direction;
  },

  getBody() {
    return this.body;
  }

};

/**
 * @type {Object} food. Еда.
 */
const food = {
  x: null,
  y: null,


  setCoordinates(point) {
    this.x = point.x;
    this.y = point.y;
  },

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    }
  },
};

/**
 * @type {Object} game. Управление игрой.
 */
const game = {
  config,
  map,
  gameStatus,
  snake,
  food,
  gameElement: null,
  newgameElement: null,

  init(userSettings) {
    this.config.init(userSettings);

    let validation = this.config.validation();

    if (!validation.isValid) {
      for (let error of validation.errors) {
        console.error(error);
      }
      return;
    }

    this.map.init(this.config.getColsCount(), this.config.getRowsCount());

    this.setEventHandlers();

    this.reset();

  },

  reset() {
    this.stop();
    this.snake.init(this.getStartSnakeBody(), 'up');
    this.food.setCoordinates(this.getRandomFreeCoordinates());
    this.render();

    this.gameStatus.init();
  },

  setEventHandlers() {
  },

  getStartSnakeBody() {
    return [{ x: Math.floor(this.config.getColsCount() / 2), y: Math.floor(this.config.getRowsCount() / 2) }];
  },

  getRandomFreeCoordinates() {
    let exclude = [this.food.getCoordinates(), ...this.snake.getBody(),];

    while (true) {
      let rndPoint = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getRowsCount()),
      };

      if (!exclude.some(point => rndPoint.x === point.x && rndPoint.y === point.y)) {
        return rndPoint;
      }
    }
  },

  render() {
    this.map.render(this.snake.getBody(), this.food.getCoordinates());

  },

  startNewGame() {
    console.log('Клик есть.')
    this.reset();
  },

  play() {

  },

  stop() {
    this.gameStatus.setStop();

  },

  finish() {

  },

  setEventHandlers() {

  }


};

window.onload = () => game.init();