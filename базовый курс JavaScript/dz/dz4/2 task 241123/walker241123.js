'use strict';

/*
Для игры, реализованной на уроке (бродилка), добавить возможность ходить по диагонали
цифрами 1, 3, 7, 9
Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, т.е. при
направлении в стенку игрок оставался на том же месте, где стоял.
*/

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

  move(direction, sc, sr) {
    console.log(direction);
    switch (direction) {
      case '6':
        if (this.x + 1 < sc) {
          this.x++;
        }
        break;
      case '4':
        if (this.x - 1 >= 0) {
          this.x--;
        }
        break;
      case '8':
        if (this.y - 1 >= 0) {
          this.y--;
        }
        break;
      case '2':
        if (this.y + 1 < sr) {
          this.y++;
        }
        break;
      case '9':
        if (this.x + 1 < sc && this.y - 1 >= 0) {
          this.x++;
          this.y--;
        }
        break;
      case '7':
        if (this.x - 1 >= 0 && this.y - 1 >= 0) {
          this.x--;
          this.y--;
        }
        break;
      case '3':
        if (this.x + 1 < sc && this.y + 1 < sr) {
          this.x++;
          this.y++;
        }
        break;
      case '1':
        if (this.x - 1 >= 0 && this.y + 1 < sr) {
          this.x--;
          this.y++;
        }
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

      this.player.move(direction, this.settings.colsCount, this.settings.rowsCount);
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
    let possibleDirections = ['6', '4', '8', '2', '1', '3', '7', '9', '-1'];
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