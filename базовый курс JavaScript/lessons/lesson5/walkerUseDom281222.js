'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  positionX: 3,
  positionY: 4,
  direction: 'right'
}

const player = {
  x: null,
  y: null,
  direction: null,

  init(starPositionX, starPositionY, direction) {
    this.x = starPositionX;
    this.y = starPositionY;
    this.direction = direction;
  }
}

const game = {
  settings,
  player,
  gameEl: null,
  tdElements: null,

  run() {
    this.init();
    this.render();
  },

  init() {
    this.player.init(this.settings.positionX, this.settings.positionY, this.direction);
    this.gameEl = document.getElementById('game');
    this.tdElements = [];
  },

  render() {
    this.gameEl.innerHTML = '';
    console.log(this.player);
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let trElem = document.createElement('tr');
      for (let col = 0; col < this.settings.colsCount; col++) {

        let tdElem = document.createElement('td');
        trElem.appendChild(tdElem);
        this.tdElements.push(tdElem);
        if (row === this.player.y && col === this.player.x) {
          tdElem.classList.add('player');
        }
      }
      this.gameEl.appendChild(trElem);
    }

    console.log()
  }
}

game.run();