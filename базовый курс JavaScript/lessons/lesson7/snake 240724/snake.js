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

  getDirection() {
    return this.direction
  },

  setDirection(direction) {
    if (this.canSetDirection(direction)) {
      this.direction = direction;
      this.lastDirection = direction;
    }
  },

  canSetDirection(direction) {
    return this.lastDirection !== direction
  },

  getNextHeadPoint() {
    let point = this.body[0];
    switch (this.direction) {
      case 'up':
        point = { x: point.x, y: point.y - 1 };
        break;
      case 'down':
        point = { x: point.x, y: point.y + 1 };
        break;
      case 'right':
        point = { x: point.x + 1, y: point.y };
        break;
      case 'left':
        point = { x: point.x - 1, y: point.y };
        break;
    }
    return point
  },

  makestep(nextPoint) {
    this.body.push(nextPoint);
    this.body.shift();
    console.log(this.body);
  }

};

const map = {
  cell: null,
  usedCells: null,
  HTMLElementGame: null,

  init() {
    this.HTMLElementGame = document.getElementById('snake-game');
    this.HTMLElementGame.innerHTML = '';
    this.cell = {};
    this.usedCells = [];
  },

  render(snakePoints, foodPoint, colsCount, rowsCount) {
    this.HTMLElementGame.innerHTML = '';
    this.usedCells.map(el => el.className = '');
    this.usedCells = [];

    for (let row = 0; row < rowsCount; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < colsCount; col++) {
        let td = document.createElement('td');
        snakePoints.map((point, idx) => {
          if (point.x === col && point.y === row) {
            td.classList.add(idx === 0 ? 'snake-head' : 'snake-body');
            this.usedCells.push(td);
          }
        });
        if (foodPoint.x === col && foodPoint.y === row) {
          td.classList.add('food');
          this.usedCells.push(td);
        }
        this.cell[`x${col}_y${row}`] = td;
        tr.appendChild(td);
      }
      this.HTMLElementGame.appendChild(tr);
    }

  },


};

const food = {
  x: null,
  y: null,

  init(startPosition) {
    this.x = startPosition.x;
    this.y = startPosition.y;
  },

  getPosition() {
    return { x: this.x, y: this.y }
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
    return this.condition === 'play'
  },

  isStop() {
    return this.condition === 'stop'
  },

  isFinish() {
    return this.condition === 'finish'
  },

};

const game = {
  config,
  statusGame,
  snake,
  map,
  food,
  HTMLElementPlayOrStopButton: null,
  HTMLElementNewGameButton: null,
  counterInterval: null,

  init(userSettings = {}) {
    let validation = this.config.validate(userSettings);

    if (!validation.result) {
      validation.errors.map(error => console.error(error));
    }

    this.config.init(userSettings);
    this.HTMLElementPlayOrStopButton = document.getElementById('playOrStopButton');
    this.HTMLElementNewGameButton = document.getElementById('newGameButton');
    this.reset();
    this.setEventHandlers();
    this.play();
  },

  play() {
    this.statusGame.setPlay();
    this.changeViewButton('stop');
    this.counterInterval = setInterval(() => this.tickInterval(), 1000 / this.config.getSnakeSpeed());
  },

  tickInterval() {
    // if (!this.canMakeStep()) {
    //   // this.finish();
    // }
    this.snake.makestep(this.snake.getNextHeadPoint());
  },

  canMakeStep() {
    let nextSnakeHeadPoint = this.snake.getNextHeadPoint();
    return nextSnakeHeadPoint.x >= 0 &&
      nextSnakeHeadPoint.y >= 0 &&
      nextSnakeHeadPoint.x < this.config.getColsCount() &&
      nextSnakeHeadPoint.y < this.config.getRowsCount()
  },

  reset() {
    this.snake.init({ x: Math.floor(this.config.getColsCount() / 2), y: Math.floor(this.config.getRowsCount() / 2) }, 'up');
    this.food.init(this.getRandomFreeCoordinate());
    this.map.init();
    this.render();
    this.stop();
  },

  render(){
    this.map.render(this.snake.getBody(), this.food.getPosition(), this.config.getColsCount(), this.config.getRowsCount());
  },

  getRandomFreeCoordinate() {
    let usedPoint = [...this.snake.getBody(), this.food.getPosition()];

    while (true) {
      let randomPoint = { x: this.getRandomNum(this.config.getColsCount()), y: this.getRandomNum(this.config.getRowsCount()) };
      if (!usedPoint.some(point => point.x === randomPoint.x && point.y === randomPoint.y)) {
        return randomPoint
      }
    }

  },

  getRandomNum(num) {
    return Math.floor(Math.random() * num)
  },

  setEventHandlers() {
    this.HTMLElementPlayOrStopButton.addEventListener('click', () => this.playOrStopHandler());
    this.HTMLElementNewGameButton.addEventListener('click', () => this.newGameHandler());
    window.document.addEventListener('keydown', (e) => this.keyDownHandler(e));
  },

  newGameHandler() {
    this.reset();
  },

  playOrStopHandler() {
    this.statusGame.isPlay() ? this.stop() : this.play();
  },

  keyDownHandler(e) {
    let direction = this.getDirection(e.code);
    this.snake.setDirection(direction);
  },

  getDirection(key) {
    switch (key) {
      case 'ArrowUp':
        return 'up';
      case 'ArrowDown':
        return 'down';
      case 'ArrowRight':
        return 'right';
      case 'ArrowLeft':
        return 'left';
    }
  },

  stop() {
    this.statusGame.setStop();
    this.changeViewButton('play');
    clearInterval(this.counterInterval);
  },

  finish() {
    this.statusGame.setFinish();
    this.changeViewButton('play', true);
  },



  changeViewButton(textBtn, disable = false) {
    this.HTMLElementPlayOrStopButton.textContent = textBtn;
    disable ? this.HTMLElementPlayOrStopButton.classList.add(finish) : '';
  }

};

window.onload = () => game.init({ snakeSpeed: 5 });
