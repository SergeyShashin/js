'use strict';

const settings = {
  colsCount: 10,
  rowsCount: 10,
  speed: 3,
  winFoodCount: 3,
};

const config = {
  settings,
  getColsCount() {
    return this.settings.colsCount;
  },

  getRowsCount() {
    return this.settings.rowsCount;
  },

  getSpeed() {
    return this.settings.speed;
  },

  winFoodCount() {
    return this.settings.speed;
  },

  init(userSettings) {
    this.settings = Object.assign(this.settings, userSettings);
  }
};

const snake = {
  body: null,
  direction: null,
  lastDirection: null,

  init(position, direction) {
    this.body = [position];
    this.direction = direction;
    this.lastDirection = direction;
  },

  getBody() {
    return this.body;
  },

  getNextHeadPoint() {

  },

  setDirection(direction) {
    this.direction = direction;
  },

  makeStep() {

  },

  growUp() {

  },

};

const map = {
  gameEl: null,
  cels: null,
  usedCels: null,

  init(colsCount, rowsCount) {
    this.gameEl = document.getElementById('snake-game');
    this.cels = {};
    this.usedCels = [];

    for (let row = 0; row < rowsCount; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < colsCount; col++) {
        let tdEl = document.createElement('td');
        this.cels[`x${col}_y${row}`] = tdEl;
        trEl.appendChild(tdEl);
      }
      this.gameEl.appendChild(trEl);
    }
  },

  render(snakePoints, foodPoint) {
    this.usedCels.forEach(el => el.className = '');
    this.usedCels = [];

    snakePoints.forEach((point, idx) => {
      let pointEl = this.cels[`x${point.x}_y${point.y}`];
      pointEl.classList.add(idx === 0 ? 'snake-head' : 'snake-body');
      this.usedCels.push(pointEl);
    });

    let foodPointEl = this.cels[`x${foodPoint.x}_y${foodPoint.y}`];
    foodPointEl.classList.add('food');
    this.usedCels.push(foodPointEl);
  },

  getGameEl() {
    return this.gameEl;
  }
};

const food = {
  position: { x: null, y: null },

  init(position) {
    this.position.x = position.x;
    this.position.y = position.y;
  },

  getPosistion() {
    return this.position;
  },

  setPositon(position) {
    this.position = position
  }
};

const status = {
  state: null,

  setPlay() {
    this.state = 'play';
  },

  setStop() {
    this.state = 'stop';
  },

  setFinish() {
    this.state = 'finish';
  },

  get() {
    return this.state;
  },

  isPlay() {
    return this.state === 'play';
  },

  isStop() {
    return this.state === 'stop';
  },

  isfinish() {
    return this.state === 'finish';
  }

};

const game = {
  config,
  snake,
  map,
  food,
  status,
  interval: null,

  init(userSettings) {
    this.config.init(userSettings);
    this.map.init(this.config.getColsCount(), this.config.getRowsCount());
    this.reset();
  },

  reset() {
    this.snake.init(this.getStartSnakePosition(), 'up');
    this.food.init(this.getRandomFreeCoordinates());
    this.render();
    this.stop();
    this.setEventHandlers();
  },

  setEventHandlers() {
    window.addEventListener('click', e => this.handlerClick(e));
    window.addEventListener('keydown', e => this.handlerKeyDown(e));
  },

  handlerKeyDown(e) {
    console.log(e);
  },

  tickInterval() {
    console.log('го');
  },

  handlerClick(e) {
    switch (e.target.id) {
      case 'playOrStopButton':
        this.status.isPlay() ? this.stop() : this.play();
        break;
      case 'newGameButton':
        this.reset();
        break;
    }
  },

  changeStateButton(text, isFinish = false) {
    let playOrStopButtonEl = document.getElementById('playOrStopButton');
    playOrStopButtonEl.textContent = text;

    if (isFinish) {
      playOrStopButtonEl.classList.add('finish');
    }
  },

  play() {
    this.status.setPlay();
    this.changeStateButton('stop');
    this.interval = setInterval(() => this.tickInterval(), 1000 / this.config.getSpeed());
  },

  stop() {
    this.status.setStop();
    this.changeStateButton('play');
    clearInterval(this.interval);
  },

  finish() {
    this.status.setFinish();
    this.changeStateButton('finish', true);
    clearInterval(this.interval);
  },

  render() {
    this.map.render(this.snake.getBody(), this.food.getPosistion());
  },

  getStartSnakePosition() {
    return {
      x: Math.floor(this.config.getColsCount() / 2),
      y: Math.floor(this.config.getRowsCount() / 2)
    }
  },

  getRandomFreeCoordinates() {
    let useCoordinates = [this.food.getPosistion(), ...this.snake.getBody()];
    while (true) {
      let randomPoint = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getRowsCount()),
      };

      if (!useCoordinates.some(point => point.x === randomPoint.x && point.y === randomPoint.y)) {
        return randomPoint
      }
    }
  }
};

window.onload = () => game.init();


