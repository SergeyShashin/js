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
    this.setDirection(direction);
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
  },
  setDirection(direction) {
    this.direction = direction;
  }
};

const game = {
  settings,
  player,
  gameElement: null,
  cels: null,
  numberInterval: null,
  run() {
    this.init();
  },

  init() {
    this.cels = {};
    this.gameElement = document.getElementById('game');
    this.player.init(this.settings.startPositionY, this.settings.startPositionX, this.settings.direction);
    this.initCels();
    this.initHandlers();
    this.tickInterval();

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
  },

  tickInterval() {
    this.numberInterval = setInterval(() => this.move(), 1000/this.settings.speed);
  },

  move() {
    let nextPoint = this.player.getNextPoint()
    this.render();
    if (this.canmakeStep(nextPoint)) {
      this.player.makeStep(nextPoint);
    }
  },

  render() {
    // this.cels[`y${this.player.y}_x${this.player.x}`].classList.remove(this.settings.stylePlayer);
    // this.cels[`y${nextPoint.y}_x${nextPoint.x}`].classList.add(this.settings.stylePlayer);
    for (let tdEl of Object.values(this.cels)) {
      tdEl.className = '';
    }
    this.cels[`y${this.player.y}_x${this.player.x}`].classList.add(this.settings.stylePlayer);

  },

  canmakeStep(nextPoint) {
    return nextPoint.y > -1 && nextPoint.y < this.settings.rowsCount &&
      nextPoint.x > -1 && nextPoint.x < this.settings.colsCount
  },
  initHandlers() {
    window.addEventListener('keydown', e => this.keyDownHandler(e));
  },

  keyDownHandler(e) {
    switch (e.code) {
      case 'ArrowUp':
        this.player.setDirection('up');
        break;
      case 'ArrowDown':
        this.player.setDirection('down');
        break;
      case 'ArrowLeft':
        this.player.setDirection('left');
        break;
      case 'ArrowRight':
        this.player.setDirection('right');
        break;
    }
  }
};

window.onload = game.run();