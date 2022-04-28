'use strict';

const settings = {
  rowscount: 10,
  colscount: 10,
  playerPositionX: 0,
  playerPositionY: 0
};

const player = {
  x: null,
  y: null,

  init(startPositionX, startPositionY) {
    this.x = startPositionX;
    this.y = startPositionY;
  },

  makeStep(direction) {
    switch (direction) {
      case 2:
        this.y++;
        break;
      case 4:
        this.x--;
        break;
      case 8:
        this.y--;
        break;
      case 6:
        this.x++;
        break;
    }
  }
};

const game = {
  settings,
  player,

  run() {
    this.player.init(this.settings.playerPositionX, this.settings.playerPositionY);

    while (true) {
      
      this.render();
      let direction = this.getDirection();

      if (direction === -1) {
        console.log('До встречи!');
        return
      }

      this.player.makeStep(direction);

    }

  },

  render() {
    let map = '';
    for (let row = 0; row <= this.settings.rowscount; row++) {
      for (let col = 0; col <= this.settings.rowscount; col++) {
        row === this.player.y && col === this.player.x ? map += 'o ' : map += 'x ';
      }
      map += '\n';
    }
    console.clear();
    console.log(map);
  },

  getDirection() {
    let possibleDirections = [2, 4, 8, 6, -1];
    
    while (true) {
      let direction = parseInt(prompt(`Введите одно из возможных направлений ${possibleDirections.join(', ')} для выхода`));

      if (!possibleDirections.includes(direction)) {
        continue;
      } else {
        return direction;
      }
    }
  }

};

game.run();