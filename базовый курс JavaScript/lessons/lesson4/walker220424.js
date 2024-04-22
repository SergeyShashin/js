'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  charPlayer: '0 ',
  charMap: 'X ',
};

const player = {
  x: null,
  y: null,

  init(startPosition) {
    this.x = startPosition.x;
    this.y = startPosition.y;
  },

  getPosition() {
    return { x: this.x, y: this.y }
  },

  move(direction) {

  }

};

const game = {
  settings,
  player,

  run() {
    this.player.init({ x: Math.round(this.settings.rowsCount / 2), y: Math.round(this.settings.colsCount / 2) });
    this.render();
  },

  render() {
    let map = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {
        console.log(this.player.getPosition());
        if (row === this.player.getPosition().x && col === this.player.getPosition().y) {
          map += this.settings.charPlayer;
        } else {
          map += this.settings.charMap;
        }
      }
      map += '\n'
    }

    console.clear();
    console.log(map);
  }

}

game.run();