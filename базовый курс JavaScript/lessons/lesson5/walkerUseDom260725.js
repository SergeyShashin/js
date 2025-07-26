'use strict';

const settings = {
  colsCount: 10,
  rowsCount: 10,
  startPosition: { x: 5, y: 5 },
  startDirection: 'up',
  speed: 5
};

const player = {
  position: { x: null, y: null },
  direction: null,

  init(startPosition, direction) {
    this.position.x = startPosition.x;
    this.position.y = startPosition.y;
    this.direction = direction;
  },

  getPosition() {
    return this.position
  },

  getDirection() {
    return this.direction
  },

  move(nextPoint) {
    this.position.x = nextPoint.x;
    this.position.y = nextPoint.y;
  },

  getNextPoint() {
    let nextPoint = {};
    nextPoint.x = this.position.x;
    nextPoint.y = this.position.y;
    switch (this.direction) {
      case 'up':
        nextPoint.y--;
        break
      case 'down':
        nextPoint.y++;
        break
      case 'right':
        nextPoint.x++;
        break
      case 'left':
        nextPoint.x--;
        break
    }
    return nextPoint;
  },

  setDirection(direction) {
    this.direction = direction
  }
};

const map = {
  gameEl: null,
  cels: null,

  init(colsCount, rowsCount, positionPlayer) {
    this.gameEl = document.getElementById('game');
    this.cels = {};
    for (let row = 0; row < rowsCount; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < colsCount; col++) {
        let tdEl = document.createElement('td');
        tdEl.dataset[`x${col}_y${row}`] = `x${col}_y${row}`;
        if (positionPlayer.x === col && positionPlayer.y === row) {
          tdEl.classList.add('player');
        }
        this.cels[`x${col}_y${row}`] = tdEl;
        trEl.appendChild(tdEl);
      }
      this.gameEl.appendChild(trEl)
    }
  },

  render(positionPlayer) {
    document.querySelector('.player').classList.remove('player');
    this.cels[`x${positionPlayer.x}_y${positionPlayer.y}`].classList.add('player');
  }

};

const game = {
  settings,
  player,
  map,
  interval: null,

  run() {
    this.init();
    this.interval = setInterval(() => {
      let nextPoint = this.player.getNextPoint();

      if (this.canStep(nextPoint)) {
        this.player.move(nextPoint);
        this.map.render(this.player.getPosition());
      }
    }, 1000 / this.settings.speed)
  },

  init() {
    this.player.init(this.settings.startPosition, this.settings.startDirection);
    this.map.init(this.settings.colsCount, this.settings.rowsCount, this.player.getPosition());
    this.setEventHandlers();
  },

  canStep(nextPoint) {
    return nextPoint.x > -1
      && nextPoint.y > -1
      && nextPoint.x < this.settings.colsCount
      && nextPoint.y < this.settings.rowsCount
  },

  setEventHandlers() {
    window.addEventListener('keydown', e => this.handlerKeyDown(e));
  },

  handlerKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
        this.player.setDirection('up');
        break
      case 'ArrowRight':
        this.player.setDirection('right');
        break
      case 'ArrowLeft':
        this.player.setDirection('left');
        break
      case 'ArrowDown':
        this.player.setDirection('down');
        break
    }
  }
};

window.onload = () => game.run();