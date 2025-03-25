'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  startPositionX: 5,
  startPositionY: 5,
};

const player = {
  x: null,
  y: null,

  init(startPositionX, startPositionY) {
    this.x = startPositionX;
    this.y = startPositionY;
  }

}

const game = {
  settings,
  player,
  run() {
    console.log('Welcome World!)');
  }
};

game.run();

