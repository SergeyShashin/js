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

  setPlaying() {
    this.condition = 'playing';
  },

  setStopped() {
    this.condition = 'stopped';
  },

  setFinished() {
    this.condition = 'finished';
  },

  isPlaying() {
    return this.condition === 'playing';
  },

  isStopped() {
    return this.condition === 'stopped';
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
  },

  getNextHeadPoint() {
    let headPoint = this.body[0];
    switch (this.direction) {
      case 'up':
        return { x: headPoint.x, y: headPoint.y - 1 };
      case 'right':
        return { x: headPoint.x + 1, y: headPoint.y };
      case 'down':
        return { x: headPoint.x, y: headPoint.y + 1 };
      case 'left':
        return { x: headPoint.x - 1, y: headPoint.y };
    }
  },

  makeStep() {
    this.lastStepDirection = this.direction;
    this.body.unshift(this.getNextHeadPoint());
    this.body.pop();
  },

  isOnPoint(point) {
    return this.body.some(snakePoint => point.x === snakePoint.x && point.y === snakePoint.y);
  },

  setDirection(direction) {
    this.direction = direction;
  },

  getLasStepDirection() {
    return this.lastStepDirection;
  },

  growUp() {
    this.body.unshift(this.getNextHeadPoint());
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

  isOnPoint(point) {
    return this.x === point.x && this.y === point.y;
  }
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
  tickInterval: null,

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
    this.reset();
  },

  play() {
    this.gameStatus.setPlaying();
    this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
    this.setPlayButton('Stop');
  },

  stop() {
    this.gameStatus.setStopped();
    clearInterval(this.tickInterval);
    this.setPlayButton('Play');
  },

  finish() {
    this.gameStatus.setFinished();
    this.setPlayButton('Game Over', true);
    clearInterval(this.tickInterval);
  },

  setEventHandlers() {
    document.getElementById('playOrStopButton').addEventListener('click', () => this.playOrStopHandler());
    document.getElementById('newGameButton').addEventListener('click', () => this.newGameHandler());
    document.addEventListener('keydown', (event) => this.keydownHandler(event));
  },

  playOrStopHandler() {
    if (this.gameStatus.isPlaying()) {
      this.stop();
    } else if (this.gameStatus.isStopped()) {
      this.play();
    }
  },

  newGameHandler() {
    this.reset();
  },

  keydownHandler(event) {
    if (!this.gameStatus.isPlaying()) {
      return;
    }
    switch (event.keyCode) {
      case 38:
      case 104:
      case 87:
        if (this.snake.getLasStepDirection() != 'down') {
          return this.snake.setDirection('up');
        }
        break;
      case 39:
      case 102:
      case 68:
        if (this.snake.getLasStepDirection() != 'left') {
          return this.snake.setDirection('right');
        }
      case 40:
      case 98:
      case 83:
        if (this.snake.getLasStepDirection() != 'up') {
          return this.snake.setDirection('down');
        }
      case 37:
      case 100:
      case 65:
        if (this.snake.getLasStepDirection() != 'right') {
          return this.snake.setDirection('left');
        }
    }

  },

  setPlayButton(text, isDisabled = false) {
    let playOrStopButtonElement = document.getElementById('playOrStopButton');
    playOrStopButtonElement.textContent = text;
    isDisabled ? playOrStopButtonElement.classList.add('finish') : playOrStopButtonElement.classList.remove('finish');
  },

  tickHandler() {
    if (!this.canMakeStep()) {
      return this.finish();
    }
    this.snake.makeStep();

    if (this.food.isOnPoint(this.snake.getNextHeadPoint())) {
      this.snake.growUp();
      this.food.setCoordinates(this.getRandomFreeCoordinates());
      if (this.isGameWon()) {
        this.finish();
      }
    }
    this.render();

  },

  canMakeStep() {
    let nextHeadPoint = this.snake.getNextHeadPoint();
    return !this.snake.isOnPoint(nextHeadPoint) &&
      nextHeadPoint.x >= 0 &&
      nextHeadPoint.y >= 0 &&
      nextHeadPoint.x < this.config.getColsCount() &&
      nextHeadPoint.y < this.config.getRowsCount();
  },

  isGameWon() {
    return this.snake.getBody().length > this.config.getWinFoodCount();
  }

};

window.onload = () => game.init({ winFoodCount: 5 });