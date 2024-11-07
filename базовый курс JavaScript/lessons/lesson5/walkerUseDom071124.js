'use strict';

const settings = {
  colsCount: 10,
  rowsCount: 10,
  startPostionX: 5,
  startPostionY: 5,
  startDirection: 'right',
  speed: 5
};

const player = {
  x: null,
  y: null,
  direction: null,

  init(startX, startY, startDirection) {
    this.x = startX;
    this.y = startY;
    this.direction = startDirection;
  },

  getNextPoint() {
    const point = {
      x: this.x,
      y: this.y
    };

    switch (this.direction) {
      case 'up':
        point.y--;
        break;
      case 'down':
        point.y++;
        break;
      case 'right':
        point.x++;
        break;
      case 'left':
        point.x--;
        break;
    }

    return point;
  },
  move(point) {
    this.x = point.x;
    this.y = point.y;
  },
  setDirection(direction) {
    this.direction = direction;
  }
};

const game = {
  settings,
  player,
  gameEl: null,
  celsElements: null,
  interval: null,

  run() {
    this.init();
    this.setKeyDownHandler();
    this.interval = setInterval(() => {
      let nextPointPlayer = this.player.getNextPoint();

      if (this.canMove(nextPointPlayer)) {
        this.player.move(nextPointPlayer);
        this.render();
      }

    }, 1000 / this.settings.speed);
  },

  init() {
    this.gameEl = document.getElementById('game');
    this.celsElements = {};
    this.player.init(this.settings.startPostionX, this.settings.startPostionY, this.settings.startDirection);

    for (let row = 0; row < this.settings.rowsCount; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < this.settings.colsCount; col++) {
        let td = document.createElement('td');
        if (row === this.player.y && col === this.player.x) {
          td.className = 'player';
        }
        tr.appendChild(td);
        this.celsElements[`col${col}_row${row}`] = td;
      }
      this.gameEl.appendChild(tr);
    }
  },

  render() {
    let playerEl = document.querySelector('.player');
    playerEl.className = '';
    this.celsElements[`col${this.player.x}_row${this.player.y}`].className = 'player';
  },

  canMove(point) {
    return point.x > -1 && point.y > -1 && point.x < this.settings.colsCount && point.y < this.settings.rowsCount;
  },

  setKeyDownHandler() {
    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'Numpad8':
        case 'ArrowUp':
          this.player.setDirection('up');
          break;
        case 'Numpad5':
        case 'ArrowDown':
          this.player.setDirection('down');
          break;
        case 'Numpad6':
        case 'ArrowRight':
          this.player.setDirection('right');
          break;
        case 'Numpad4':
        case 'ArrowLeft':
          this.player.setDirection('left');
          break;
      }

    })
  }

}

game.run();