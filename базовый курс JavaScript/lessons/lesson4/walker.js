'use strict';

const settings = {
  rowscount: 10,
  colscount: 10,
  playerPositionX: 10,
  playerPositionY: 0
}

const player = {
  x: null,
  y: null,
  
  init(startPositionX, startPositionY){
    this.x = startPositionX;
    this.y = startPositionY;
  }
}

const game = {
  settings,
  player,

  run() {
    this.player.init(this.settings.playerPositionX, this.settings.playerPositionY);
    
    

  }
}

game.run();