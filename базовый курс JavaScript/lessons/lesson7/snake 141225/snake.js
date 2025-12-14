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
      point.classList.add(idx === 0 ? 'snake-head' : 'snake-body');
      this.usedCels.push(point);
    });

    foodPoint.classList.add('food');
    this.usedCels.push(foodPoint);
  }
};

const food = {
  position: null,

  init(position) {
    this.position = position;
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

  setStatus(state) {
    this.state = state;
  },

  getStatus() {
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
  init(userSettings) {
    this.config.init(userSettings);
    this.map.init(this.config.getColsCount(), this.config.getRowsCount());

  }
};

window.onload = () => game.init();


