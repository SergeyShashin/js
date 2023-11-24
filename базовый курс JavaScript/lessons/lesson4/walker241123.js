'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  startPositionPlayerX: 0,
  startPositionPlayerY: 0
}

const player = {
  x: null,
  y: null,

  init(x, y) {
    this.y = y;
    this.x = x;
  },

  move(direction) {
    console.log(direction);
    switch (direction) {
      case '6':
        this.x++;
        break;
      case '4':
        this.x--;
        break;
      case '8':
        this.y--;
        break;
      case '2':
        this.y++;
        break;

    }
  }

}

const game = {
  settings,
  player,

  run() {
    this.player.init(this.settings.startPositionPlayerY, this.settings.startPositionPlayerX)
    while (true) {
      this.render();
      let direction = this.getDirection();

      if (direction === '-1') {
        console.log(':)');
        return
      }

      this.player.move(direction);
    }
  },

  render() {
    let map = '';

    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {
        if (this.player.y === row && this.player.x === col) {
          map += 'P ';
        } else {
          map += 'X ';
        }
      }
      map += '\n';
    }

    console.clear();
    console.log(map);
  },

  getDirection() {
    let possibleDirections = ['6', '4', '8', '2', '-1'];
    let direction;

    while (true) {
      direction = prompt(`Куда пойдём? ${possibleDirections.join(' ')}`);
      if (possibleDirections.includes(direction)) {
        return direction;
      }
    }

  }

}

game.run();