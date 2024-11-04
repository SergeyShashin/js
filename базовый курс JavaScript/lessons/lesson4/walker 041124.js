'use strict';


const settings = {
  colsCount: 10,
  rowsCount: 10,
  startPositionX: 5,
  startPositionY: 5,
};

const player = {
  x: null,
  y: null,

  init(startPositionX, startPositionY) {
    this.x = startPositionX;
    this.y = startPositionY;
  },

  move(direction) {
    switch (direction) {
      case '8':
        this.y--;
        break;
      case '5':
        this.y++;
        break;
      case '6':
        this.x++;
        break;
      case '4':
        this.x--;
        break;
    }
  }
};

const game = {
  settings,
  player,

  run() {
    this.player.init(this.settings.startPositionX, this.settings.startPositionY);
    this.render();

    while (true) {
      let direction = this.getDirection();
      if (direction === '-1') {
        console.log(`Спасбио за игру. До новых встреч.`);

        return;
      }

      this.player.move(direction);
      this.render();

    }
  },

  render() {
    console.clear();
    let map = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {
        if (row === this.player.y && col === this.player.x) {
          map += 'O ';
        } else {
          map += 'X ';
        }
      }
      map += '\n';
    }
    console.log(map);
  },

  getDirection() {
    let possibleDirections = ['8', '5', '4', '6', '-1'];
    let direction;

    while (true) {
      direction = prompt(`${possibleDirections.join(' ')}. Для выхода -1.`);

      if (possibleDirections.includes(direction)) {
        return direction;
      }
    }

  }

};

game.run();