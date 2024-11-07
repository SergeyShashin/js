'use strict';

const settings = {
  colsCount: 10,
  rowsCount: 10,
  startPostionX: 5,
  startPostionY: 5,
  startDirection: 'up'
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

  getNextPoint() { },
  makeMove() { }
};

const game = {
  settings,
  player,
  gameEl: null,
  celsElements: null,

  run() {
    this.init();
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
      }
      this.gameEl.appendChild(tr);
    }

    console.log(this.celsElements);

  }
}

game.run();