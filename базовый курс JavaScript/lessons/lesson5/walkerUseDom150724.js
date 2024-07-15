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
    this.direction = direction;
  },

  move() {
    let nextPoint = this.getNextPoint();
    this.x = nextPoint.x;
    this.y = nextPoint.y;
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
    this.render();
    this.numSetInterval = setInterval(() => {
      this.canMove() ? this.player.move() : '';
      this.render();
    }, 1000 / this.settings.stepInSeconds);
  },

  init() {
    this.HTMLelementGame = document.getElementById('game');
    this.cels = [];
    this.player.init(this.settings.playerStartPositionX, this.settings.playerStartPositionY, 'up');
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
        row === this.player.y && col == this.player.x ? td.className = 'player' : '';
        tr.appendChild(td);
        this.cels.push(td);
      }
    }
  },

  handlerKeyDown(e) {
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
    }
  },

  canMove() {
    let nexPlayerPosition = this.player.getNextPoint();
    return nexPlayerPosition.x >= 0 && nexPlayerPosition.y >= 0
      && nexPlayerPosition.x < this.settings.colsCount
      && nexPlayerPosition.y < this.settings.rowsCount
  }
};

game.run();