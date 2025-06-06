'use strict';

// Выводить счёт игры в режиме реального времени.

const settings = {
  rowsCount: 18,
  colsCount: 18,
  speed: 3,
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

    if (this.getRowsCount() < 5 || this.getRowsCount() > 18 || !Number.isInteger(this.getRowsCount())) {
      result.isValid = false;
      errors.push(`RowsCount= ${this.getRowsCount()}, a может быть в диапазоне целых чисел [5-18]`);
    };

    if (this.getColsCount() < 5 || this.getColsCount() > 18 || !Number.isInteger(this.getColsCount())) {
      result.isValid = false;
      errors.push(`ColsCount = ${this.getColsCount()}, а может быть в диапазоне целых чисел [5-18]`);
    };

    if (this.getSpeed() < 3 || this.getSpeed() > 10 || !Number.isInteger(this.getSpeed())) {
      result.isValid = false;
      result.errors.push(`Speed = ${this.getSpeed()}, а может быть в диапазоне целых чисел [3-10]`);
    };

    if (this.getWinFoodCount() < 1 || this.getWinFoodCount() > 20 || !Number.isInteger(this.getWinFoodCount())) {
      result.isValid = false;
      errors.push(`WinFoodCount=${this.getWinFoodCount()}, а может быть в диапазоне целых чисел [1-20]`);
    };

    return result
  }
};

const map = {
  gameEl: null,
  cells: {},
  usedCells: [],

  init(rowsCount, colsCount) {
    this.gameEl = document.getElementById('snake-game');
    this.cells = {};
    this.usedCells = [];

    for (let row = 0; row < rowsCount; row++) {
      let tr = document.createElement('tr');

      for (let col = 0; col < colsCount; col++) {
        let td = document.createElement('td');
        this.cells[`x${col}_y${row}`] = td;
        tr.appendChild(td);
      }

      this.gameEl.appendChild(tr);
    }

  },

  render(snakePoints, foodPoint) {
    for (let cell of this.usedCells) {
      cell.className = '';
    }
    this.usedCells = [];

    snakePoints.forEach((point, idx) => {
      let snakePointEl = this.cells[`x${point.x}_y${point.y}`];

      if (idx === 0) {
        snakePointEl.classList.add('snake-head');
      } else {
        snakePointEl.classList.add('snake-body');
      }

      this.usedCells.push(snakePointEl);
    });

    let foodPointEl = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
    foodPointEl.className = 'food';
    this.usedCells.push(foodPointEl);
  }
};

const food = {
  x: null,
  y: null,

  init(positon) {
    this.x = positon.x;
    this.y = positon.y;
  },

  getPosition() {
    return { x: this.x, y: this.y }
  },

  setPosition(positon) {
    this.x = positon.x;
    this.y = positon.y;
  },

  onPoint(point) {
    return this.x === point.x && this.y === point.y
  }
};

const snake = {
  body: null,
  direction: null,
  lastDirection: null,

  init(startPosition, direction) {
    this.body = [{ x: startPosition.x, y: startPosition.y }];
    this.direction = direction;
    this.lastDirection = direction;
  },

  getBody() {
    return this.body
  },

  setDirection(direction) {
    if (this.canSetDirection(direction)) {
      this.direction = direction;
      this.lastDirection = direction;
    }
  },

  canSetDirection(direction) {
    switch (direction) {
      case 'up':
        return this.lastDirection !== 'down';
      case 'right':
        return this.lastDirection !== 'left';
      case 'left':
        return this.lastDirection !== 'right';
      case 'down':
        return this.lastDirection !== 'up';
    }
  },

  getNextHeadPoint() {
    let headPoint = {
      x: this.body[0].x,
      y: this.body[0].y
    };
    switch (this.direction) {
      case 'up':
        headPoint.y--;
        break;
      case 'down':
        headPoint.y++;
        break;
      case 'right':
        headPoint.x++;
        break;
      case 'left':
        headPoint.x--;
        break;
    }
    return headPoint;
  },

  makeStep(point) {
    this.body.unshift(point);
    this.body.pop();
  },

  growUp(nextHeadPoint) {
    this.body.unshift(nextHeadPoint);
  }
};

const statusGame = {
  condition: null,

  setPlay() {
    this.condition = 'play';
  },

  setSop() {
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
};

const score = {
  score: null,
  scoreEl: null,

  init(number) {
    this.score = number;
    this.scoreEl = document.getElementById('score');
  },

  setScore(number) {
    this.score = number;
    this.scoreEl.textContent = this.score;
  },

  upScore() {
    this.score++;
    this.scoreEl.textContent = this.score;
  },


}

const game = {
  config,
  map,
  food,
  snake,
  statusGame,
  score,
  playOrStopBtnEl: null,
  newGameBtnEl: null,
  numberInterval: null,

  init(userSettings = {}) {
    this.config.init(userSettings);
    let validation = this.config.validate();

    if (!validation.isValid) {
      for (let error of validation.errors) {
        console.error(error);
      }
      return
    }

    this.playOrStopBtnEl = document.getElementById('playOrStopButton');
    this.newGameBtnEl = document.getElementById('newGameButton');

    this.map.init(this.config.getRowsCount(), this.config.getColsCount());
    this.snake.init(this.getStartPositionSnake(), 'right');
    this.food.init(this.getRandomFreeCoordinate());
    this.score.init(0);
    this.reset();
    this.render();
    this.setEventHandlers();

  },

  getStartPositionSnake() {
    return {
      x: Math.round(this.config.getColsCount() / 2),
      y: Math.round(this.config.getRowsCount() / 2),
    }
  },

  getRandomFreeCoordinate() {
    let exclude = [this.food.getPosition(), ...this.snake.getBody()];

    while (true) {
      let random = { x: Math.floor(Math.random() * this.config.getColsCount()), y: Math.floor(Math.random() * this.config.getRowsCount()) };
      if (!exclude.some(point => point.x === random.x && point.y === random.y)) {
        return random
      }
    }

  },

  reset() {
    this.stop();
    this.snake.init(this.getStartPositionSnake(), 'right');
    this.food.setPosition(this.getRandomFreeCoordinate());
    this.score.setScore(0);
    this.render();
  },

  render() {
    this.map.render(this.snake.getBody(), this.food.getPosition());
  },

  play() {
    this.statusGame.setPlay();
    this.setTextBtnPlayOrStop('stop');
    this.numberInterval = setInterval(() => this.tickInterval(), 1000 / this.config.getSpeed());

  },

  stop() {
    this.statusGame.setSop();
    this.setTextBtnPlayOrStop('play');
    clearInterval(this.numberInterval);
  },

  finish() {
    this.statusGame.setFinish();
    this.setTextBtnPlayOrStop('finish', true);
    clearInterval(this.numberInterval);
  },

  setTextBtnPlayOrStop(text, isFinish = false) {
    this.playOrStopBtnEl.textContent = text;
    if (isFinish) {
      this.playOrStopBtnEl.classList.add = 'finish';
    } else {
      this.playOrStopBtnEl.classList.remove = 'finish';
    }
  },

  setEventHandlers() {
    this.newGameBtnEl.addEventListener('click', () => this.startNewGame());
    this.playOrStopBtnEl.addEventListener('click', () => this.playOrStop());
    document.addEventListener('keydown', e => this.keyHandler(e));
  },

  startNewGame() {
    this.reset();
  },

  playOrStop() {
    this.statusGame.isPlay() ? this.stop() : this.play();
  },

  tickInterval() {
    let nextHeadPoint = this.snake.getNextHeadPoint();

    if (!this.canStep(nextHeadPoint) || this.isWin()) {
      this.finish();
      return
    }

    if (this.food.onPoint(nextHeadPoint)) {
      this.snake.growUp(nextHeadPoint);
      this.score.upScore();
      this.food.setPosition(this.getRandomFreeCoordinate());
    } else {
      this.snake.makeStep(nextHeadPoint);
    }

    this.render();

  },

  keyHandler(e) {
    switch (e.code) {
      case 'ArrowUp':
      case 'Numpad8':
        this.snake.setDirection('up');
        break;
      case 'ArrowDown':
      case 'Numpad5':
        this.snake.setDirection('down');
        break;
      case 'ArrowRight':
      case 'Numpad6':
        this.snake.setDirection('right');
        break;
      case 'ArrowLeft':
      case 'Numpad4':
        this.snake.setDirection('left');
        break;
    }
  },

  canStep(nextHeadPoint) {
    return nextHeadPoint.x > -1
      && nextHeadPoint.x < this.config.getColsCount()
      && nextHeadPoint.y > -1
      && nextHeadPoint.y < this.config.getRowsCount()
      && this.nextStepOnSnake(nextHeadPoint);
  },

  nextStepOnSnake(nextHeadPoint) {
    let body = this.snake.getBody();
    return body.length < 3 ? true : !body.slice(1).some(point => point.x === nextHeadPoint.x && point.y === nextHeadPoint.y)
  },

  isWin() {
    return this.snake.getBody().length === this.config.getWinFoodCount();
  }

};

window.onload = () => game.init({ speed: 5, winFoodCount: 10 });