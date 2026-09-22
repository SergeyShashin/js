'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  direction: 'up',
  startPositionY: 5,
  startPositionX: 5,
  speed: 3,
  stylePlayer: 'player'
};

const player = {
  y: null,
  x: null,
  direction: null,

  init(y, x, direction) {
    this.y = y;
    this.x = x;
    this.direction = direction;
  },

  getNextPoint() {
    const nextPoint = {
      y: this.y,
      x: this.x,
    }
    switch (this.direction) {
      case 'up': {
        nextPoint.y--;
      }
        break;
      case 'down': {
        nextPoint.y++;
      }
        break;
      case 'left': {
        nextPoint.x--;
      }
        break;
      case 'right': {
        nextPoint.x++;
      }
        break;
    }
    return nextPoint;
  },

  makeStep(point) {
    this.y = point.y;
    this.x = point.x;
  }
};

const game = {
  settings,
  player,
  gameElement: null,
  cels: null,
  run() {
    this.init();
  },

  init() {
    this.cels = {};
    this.gameElement = document.getElementById('game');
    this.player.init(this.settings.startPositionY, this.settings.startPositionX, this.settings.direction);
    this.initCels();

  },

  initCels() {
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < this.settings.colsCount; col++) {
        let tdEl = document.createElement('td');
        this.cels[`y${row}_x${col}`] = tdEl;
        trEl.appendChild(tdEl);
        row === this.player.y && col === this.player.x ? tdEl.classList.add(this.settings.stylePlayer) : '';
      }
      this.gameElement.appendChild(trEl);
    }
  }
};

window.onload = game.run();