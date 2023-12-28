'use strict';


const settings = {
  rowsCount: 10,
  colsCount: 10,
  startPositionX: 5,
  startPositionY: 5,
  direction: 'right',
  stepInSeconds: 3
};

const player = {
  x: null,
  y: null,
  direction: null,

  init(startPositionX, startPositionY, direction) {
    this.x = startPositionX;
    this.y = startPositionY;
    this.setDirection(direction);
  },

  setDirection(direction) {
    this.direction = direction;
  },

  move(point) {
    this.x = point.x;
    this.y = point.y
  },

  getNextPoint(direction) {
    let point = {
      x: this.x,
      y: this.y
    }

    switch (direction) {
      case 'up': {
        point.y--;
        break;
      }
      case 'down': {
        point.y++;
        break;
      }
      case 'right': {
        point.x++;
        break;
      }
      case 'left': {
        point.x--;
        break;
      }
    }

    return point;
  }

};

const game = {
  settings,
  player,
  game: null,
  cels: null,

  run() {
    this.init();

    setInterval(() => {
      let nextPoint = this.player.getNextPoint(this.player.direction);
      if (this.canMakeStep(nextPoint)) {
        this.player.move(nextPoint);
        this.render();
      }
    }, 1000 / this.settings.stepInSeconds);
  },

  init() {
    this.game = document.getElementById('game');
    this.player.init(this.settings.startPositionX, this.settings.startPositionY, this.settings.direction);
    this.cels = [];
    this.setEventListener();
    this.renderInit();
  },

  setEventListener() {
    document.addEventListener('keydown', (event) => this.keyDownHandler(event));
  },

  renderInit() {
    this.game.innerHTML = '';

    for (let row = 0; row < this.settings.rowsCount; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < this.settings.colsCount; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        if (row === this.settings.startPositionY && col === this.settings.startPositionX) {
          td.className = 'player';
        }
        td.id = `x${col}_y${row}`;
      }
      this.game.appendChild(tr);
    }
  },

  keyDownHandler(event) {
    switch (event.code) {
      case 'ArrowUp':
        this.player.setDirection('up');
        break;
      case 'ArrowDown':
        this.player.setDirection('down');
        break;
      case 'ArrowRight':
        this.player.setDirection('right');
        break;
      case 'ArrowLeft':
        this.player.setDirection('left');
        break;
    }

    this.render();

  },

  canMakeStep(nextPoint) {
    return nextPoint.x >= 0 && nextPoint.y >= 0
      && nextPoint.x < this.settings.colsCount
      && nextPoint.y < this.settings.rowsCount
  },

  render() {
    document.querySelector('.player').className='';
    document.getElementById(`x${this.player.x}_y${this.player.y}`).className = 'player';
  }

};

game.run();