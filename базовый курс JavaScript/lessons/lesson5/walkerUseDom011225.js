'use strict';

const settings = {
  colsCount: 10,
  rowsCount: 10,
  speed: 5,
};

const player = {
  x: null,
  y: null,
  direction: null,
  init(startPosition, direction) {
    this.x = startPosition.x;
    this.y = startPosition.y;
    this.direction = direction;
  },
  getPosition() {
    return { x: this.x, y: this.y }
  },
  getDirection() {
    return this.direction
  },
  setDirection(direction) {
    this.direction = direction
  },
  getNextPoint() {
    let x = this.x;
    let y = this.y
    switch (this.getDirection()) {
      case 'left':
        x--;
        break;
      case 'right':
        x++;
        break;
      case 'down':
        y++;
        break;
      case 'up':
        y--;
        break;
    }
    return { x: x, y: y }
  },
  makeStep(positionPlayer) {
    this.x = positionPlayer.x;
    this.y = positionPlayer.y;
  }
};

const map = {
  gameHTMLEl: null,
  borderX: null,
  borderY: null,
  cels: null,
  usedCels: null,
  init(borders, positionPlayer) {
    this.gameHTMLEl = document.getElementById('game');
    this.borderX = borders.borderX;
    this.borderY = borders.borderY;
    this.cels = {};
    this.usedCels = [];
    this.createMap(positionPlayer);
  },
  createMap(positionPlayer) {
    for (let row = 0; row < this.borderY; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < this.borderX; col++) {
        let tdEl = document.createElement('td');
        tdEl.dataset.x = col;
        tdEl.dataset.y = row;
        if (col === positionPlayer.x && row === positionPlayer.y) {
          tdEl.className = 'player';
          this.usedCels.push(tdEl);
        }
        trEl.appendChild(tdEl);
        this.cels[`x${col}_y${row}`] = tdEl;
      }
      this.gameHTMLEl.appendChild(trEl);
    }
  },
  render(positionPlayer) {
    this.usedCels.map(el => el.className = '');
    this.usedCels = [];
    this.cels[`x${positionPlayer.x}_y${positionPlayer.y}`].className = 'player';
    this.usedCels.push(this.cels[`x${positionPlayer.x}_y${positionPlayer.y}`]);
  }
};

const game = {
  settings,
  player,
  map,
  interval: null,
  run() {
    this.init();
  },
  init() {
    this.player.init({ x: Math.floor(this.settings.colsCount) / 2, y: Math.floor(this.settings.rowsCount / 2) }, 'up');
    this.map.init({ borderX: this.settings.colsCount, borderY: this.settings.rowsCount }, this.player.getPosition());
    this.setEventHandlers();
    this.interval = setInterval(() => this.tickInterval(), 1000 / this.settings.speed);
  },
  setEventHandlers() {
    window.addEventListener('keydown', e => this.handlerKeyDown(e));
  },
  handlerKeyDown(e) {
    let direction;
    switch (e.key) {
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowUp':
        direction = 'up';
        break;
    }
    this.player.setDirection(direction);
  },
  tickInterval() {
    let nextPoint = this.player.getNextPoint();
    if (this.canStep(nextPoint)) {
      this.player.makeStep(nextPoint);
      this.map.render(this.player.getPosition());
    }
  },
  canStep(nextPoint) {
    return nextPoint.x > -1 && nextPoint.x < this.settings.colsCount &&
      nextPoint.y > -1 && nextPoint.y < this.settings.rowsCount
  }

};

window.onload = () => game.run();