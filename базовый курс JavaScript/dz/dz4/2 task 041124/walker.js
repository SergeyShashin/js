'use strict';

/*
Для игры, реализованной на уроке (бродилка), добавить возможность ходить по диагонали
цифрами 1, 3, 7, 9
Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, т.е. при
направлении в стенку
игрок оставался на том же месте где стоял.
*/

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

  getNexPoint(direction) {
    let x = this.x;
    let y = this.y;

    switch (direction) {
      case '7':
        return [--x, --y];
      case '8':
        return [x, --y];
      case '9':
        return [++x, --y];
      case '5':
        return [x, ++y];
      case '6':
        return [++x, y];
      case '4':
        return [--x, y];
      case '1':
        return [--x, ++y];
      case '3':
        return [++x, ++y];
    }
  },

  move(x, y) {
    this.x = x;
    this.y = y;
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

      let nextPoint = this.player.getNexPoint(direction);
      console.log(nextPoint[0] + '_' + nextPoint[1]);

      if (nextPoint[0] > -1 && nextPoint[1] > -1 && nextPoint[0] < this.settings.colsCount && nextPoint[1] < this.settings.rowsCount) {
        this.player.move(nextPoint[0], nextPoint[1]);
        this.render();
      }
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
    let possibleDirections = ['7', '8', '9', '1', '3', '5', '4', '6', '-1'];
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