'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  positionX: 3,
  positionY: 4,
  directiond: 'right'
};

const player = {
  x: null,
  y: null,
  direction: null,

  init(startX, startY, startDirection) {
    this.x = startX,
      this.y = startY,
      this.direction = startDirection
  }
};

const game = {
  settings,
  player,
  gameElement: null,
  tdElements: null,

  run() {
    this.init();
    this.render();
  },

  init() {
    this.gameElement = document.getElementById('game');
    this.tdElements = [];
    this.player.init(this.settings.positionX, this.settings.positionY, this.direction);
  },

  render() {
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let trElement = document.createElement('tr');
      this.gameElement.appendChild(trElement);

      for (let col = 0; col < this.settings.colsCount; col++) {
        let tdElement = document.createElement('td');
        trElement.appendChild(tdElement);

        if (row === this.player.y && col === this.player.y) {
          tdElement.classList.add('player');
        }
      }
    }
  }
};

window.onload = game.run();