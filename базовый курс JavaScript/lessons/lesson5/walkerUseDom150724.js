'use strict';

const settings = {
  colsCount: 10,
  rowsCount: 10,
  playerStartPositionX: 4,
  playerStartPositionY: 4,
  stepInSeconds: 5
};

const player = {
  x: null,
  y: null,
  direction: null,

  init(startPositionX, startPositionY, direction) {
    this.x = startPositionX;
    this.y = startPositionY;
    this.direction = direction
  },

  move() {
    let nextPoint = this.getNextPoint();
    this.x = nextPoint.x;
    this.y = nextPoint.y;
    console.log(this.x + '' + this.y);
  },

  getNextPoint() {
    let pointX = this.x;
    let pointY = this.y;

    switch (this.direction) {
      case 'up':
        pointY--;
        break;
      case 'down':
        pointY++;
        break;
      case 'right':
        pointX++;
        break;
      case 'left':
        pointX--;
        break;
    }

    return { x: pointX, y: pointY }

  }
};

const game = {
  settings,
  player,
  HTMLelementGame: null,
  cels: null,
  numSetInterval: null,

  run() {
    this.init();
    this.numSetInterval = setInterval(() => {
      this.player.move();
      this.render();
    }, 1000);
  },

  init() {
    this.HTMLelementGame = document.getElementById('game');
    this.cels = [];
    this.player.init(this.settings.playerStartPositionX, this.playerStartPositionY, 'up');
    this.render();
    document.addEventListener('keydown', (e) => this.handlerKeyDown(e));
  },

  render() {
    this.HTMLelementGame.innerHTML = '';
    this.cels.map(el => el.className = '');
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let tr = document.createElement('tr');
      this.HTMLelementGame.appendChild(tr);
      for (let col = 0; col < this.settings.colsCount; col++) {
        let td = document.createElement('td');
        td.dataset.coordinate = `y${row}_x${col}`;
        row === this.settings.playerStartPositionY && col == this.settings.playerStartPositionX ? td.className = 'player' : '';
        tr.appendChild(td);
        this.cels.push(td);
      }
    }
  },

  handlerKeyDown(e) {
    console.log(e.code);
    switch (e.code) {
      case 'ArrowUp':
        this.player.direction = 'up';
        break;
      case 'ArrowDown':
        this.player.direction = 'down';
        break;
      case 'ArrowRight':
        this.player.direction = 'right';
        break;
      case 'ArrowLeft':
        this.player.direction = 'left';
        break;
      default: console.error('Ошибка в методе handlукKeyDown');
    }
  }
};

game.run();