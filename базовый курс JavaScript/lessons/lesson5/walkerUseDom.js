'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  playerStartX: 5,
  playerStartY: 5,
  playerStartDirection: 'right',


};

const player = {
  x: null,
  y: null,
  direction: null,

  setPositionXY(x, y) {
    this.x = x;
    this.y = y;
  },
  setDirection(direction) {
    this.direction = direction;
  },

  makeStep() {

  },

};

const game = {
  settings,
  player,
  gameElement: null,

  run() {
    this.init();
  },

  init() {
    this.gameElement = document.getElementById('game');
    document.body.appendChild(this.gameElement);


    this.player.setPositionXY(this.settings.playerStartX, this.settings.playerStartY);
    this.player.setDirection(this.settings.playerStartDirection);
    this.render();
  },
  
  render() {
    this.gameElement.innerHtml = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < this.settings.colsCount; col++) {
        let td = document.createElement('td');
        if (row === this.player.x && col === this.player.y) {
          td.classList.add('player');
        }
        tr.appendChild(td);
      }
      this.gameElement.appendChild(tr);

    }
  }

};

window.onLoad = game.run();