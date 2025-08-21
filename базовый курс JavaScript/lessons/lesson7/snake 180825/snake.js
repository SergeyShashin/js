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
  cells: null,
  usedCells: null,
  сlasses: null,

  init(colsCount, rowsCount) {
    this.gameEl = document.getElementById('snake-game');
    this.cells = {};
    this.usedCells = [];
    this.classes = ['snake-body', 'snake-head', 'food'];

    for (let row = 0; row < rowsCount; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < colsCount; col++) {
        let tdEl = document.createElement('td');
        trEl.appendChild(tdEl);
        this.cells[`x${col}y${row}`] = tdEl;
      }
      this.gameEl.appendChild(trEl);
    }

  },

  render(snakePoints, foodPoint) {
    Object.values(this.cells).map(cell => cell.classList.remove(...this.classes));
    this.usedCells = [];

    Object.values(snakePoints).map((point, idx) => {
      idx === 0 ? this.addClassPoint(point, 'snake-head') : this.addClassPoint(point, 'snake-body');
      this.addPointInUsedCells(point);
    });

    this.addClassPoint(foodPoint, 'food');
    this.addPointInUsedCells(foodPoint);
  },

  addClassPoint(point, nameClass) {
    this.cells[`x${point.x}y${point.y}`].classList.add(nameClass);
  },

  addPointInUsedCells(point) {
    this.usedCells.push(point);
  }
};

const snake = {
  body: null,
  direction: null,
  lastStepDirection: null,

  init(startPostion, direction) {
    this.body = [startPostion];
    this.direction = direction;
    this.lastStepDirection = direction;
  },

  getBody() {
    return this.body;
  },

  setDirection(direction) {
    if (this.canSetDirection(direction)) {
      this.direction = direction;
      this.lastStepDirection = direction;
    }

  },

  canSetDirection(direction) {
    switch (direction) {
      case 'up':
        return this.lastStepDirection !== 'down';
      case 'down':
        console.log(this.lastStepDirection !== 'up');
        return this.lastStepDirection !== 'up';
      case 'right':
        return this.lastStepDirection !== 'left';
      case 'left':
        return this.lastStepDirection !== 'right';
    }
  }

};

const food = {
  coordinate: null,

  init(coordinate) {
    this.coordinate = coordinate;
  },

  getCoordinate() {
    return this.coordinate ? this.coordinate : {};
  }
};

const statusGame = {
  condition: null,
  setPlay() {
    this.condition = 'play';
  },

  setStop() {
    this.condition = 'stop';
  },

  setFinish() {
    this.condition = 'finish';
  },

  isPlay() {
    return this.condition === 'play';
  },

  isStop() {
    return this.condition === 'stop';
  },

  isFinish() {
    return this.condition === 'finish';
  }

};

const game = {
  config,
  map,
  snake,
  food,
  statusGame,
  playOrStopButtonEl: null,
  newGameButtonEl: null,
  numberInterval: null,

  init(userSettings = {}) {
    console.log('WELCOME WORLD!)');
    this.config.init(userSettings);
    let validation = this.config.validation();
    this.playOrStopButtonEl = document.getElementById('playOrStopButton');
    this.newGameButtonEl = document.getElementById('newGameButton');

    if (!validation.isValid) {
      for (let error of validation.errors) {
        console.error(error);
      }
      return
    }

    this.map.init(this.config.getColsCount(), this.config.getRowsCount());
    this.setEventHandlers();
    this.reset();
  },

  reset() {
    this.snake.init(this.getStartPosition(), 'up');
    this.food.init(this.getRandomFreeCoordinate());
    this.map.render(this.snake.getBody(), this.food.getCoordinate());
    this.stop();
  },

  getStartPosition() {
    return { x: Math.floor(this.config.getColsCount() / 2), y: Math.floor(this.config.getRowsCount() / 2) }
  },

  getRandomFreeCoordinate() {
    let usedCoordinates = [this.food.getCoordinate(), ...this.snake.getBody()];

    while (true) {
      let randomCoordinate = { x: Math.floor(Math.random() * this.config.getColsCount()), y: Math.floor(Math.random() * this.config.getRowsCount()) };
      if (!usedCoordinates.some(coordinate => coordinate.x === randomCoordinate.x && coordinate.y === randomCoordinate.y)) {
        return randomCoordinate
      }
    }
  },

  setEventHandlers() {
    this.playOrStopButtonEl.addEventListener('click', () => this.handlerClickPlayOrStopButtonEl());
    this.newGameButtonEl.addEventListener('click', () => this.handlerClickNewGameButtonEl());
    window.addEventListener('keydown', e => this.handlerKeydown(e));
  },

  handlerClickPlayOrStopButtonEl() {
    this.statusGame.isPlay() ? this.stop() : this.play();
  },

  handlerClickNewGameButtonEl() {
    this.reset();
  },

  handlerKeydown(e) {
    switch (e.code) {
      case 'ArrowRight':
        this.snake.setDirection('right');
        break;
      case 'ArrowLeft':
        this.snake.setDirection('left');
        break;
      case 'ArrowDown':
        this.snake.setDirection('down');
        break;
      case 'ArrowUp':
        this.snake.setDirection('up');
        break;
    }

  },

  stop() {
    this.statusGame.setStop();
    clearInterval(this.numberInterval);
    this.changeTextBtnPlayOrStop('PLAY');
  },

  play() {
    this.statusGame.setPlay();
    this.numberInterval = setInterval(() => console.log('го'), 1000 / this.config.getSnakeSpeed());
    this.changeTextBtnPlayOrStop('STOP');
  },

  changeTextBtnPlayOrStop(text, flag = false) {
    this.playOrStopButtonEl.textContent = text;

    if (flag) {
      this.playOrStopButtonEl.classList.add('finish');
    }
  }


};

window.onload = () => game.init({ snakeSpeed: 7 });