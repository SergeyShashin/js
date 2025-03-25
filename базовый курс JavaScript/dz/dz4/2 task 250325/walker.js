'use strict';

/*
Для игры, реализованной на уроке (бродилка), добавить возможность ходить по диагонали
цифрами 1, 3, 7, 9
Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, т.е. при
направлении в стенку
игрок оставался на том же месте где стоял.
*/

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
  },

  move(point) {
    this.x = point.x;
    this.y = point.y;
  },

  getNextStepPoint(direction) {
    let nextPoint = {};
    switch (direction) {
      case '4':
        nextPoint = { x: this.x - 1, y: this.y };
        break;
      case '6':
        nextPoint = { x: this.x + 1, y: this.y };
        break;
      case '8':
        nextPoint = { x: this.x, y: this.y - 1 };
        break;
      case '5':
        nextPoint = { x: this.x, y: this.y + 1 };
        break;
      case '1':
        nextPoint = { x: this.x - 1, y: this.y + 1 };
        break;
      case '3':
        nextPoint = { x: this.x + 1, y: this.y + 1 };
        break;
      case '7':
        nextPoint = { x: this.x - 1, y: this.y - 1 };
        break;
      case '9':
        nextPoint = { x: this.x + 1, y: this.y - 1 };
        break;
    }
    return nextPoint
  }
};

const game = {
  settings,
  player,

  run() {
    console.log('Welcome World!)');

    this.player.init(this.settings.startPositionX, this.settings.startPositionY);

    while (true) {
      this.render();
      let direction = this.getDirection();

      if (direction === '-1') {
        alert('До встречи!)');
        return
      }

      let nextPoint = this.player.getNextStepPoint(direction);

      if (this.canMove(nextPoint)) {
        this.player.move(nextPoint);
      }

    }
  },

  render() {
    console.clear();
    let map = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {

        col === this.player.x && row === this.player.y ? map += ':) ' : map += 'X  ';
      }
      map += '\n\n';
    }
    console.log(map);
  },

  getDirection() {
    let availableDirections = ['1', '3', '4', '5', '6', '7', '8', '9', '-1'];

    while (true) {
      let direction = prompt(`Возможные направления: ${availableDirections.join(', ')}. Для выхода -1.`);

      if (availableDirections.includes(direction)) {
        return direction
      }
    }
  },

  canMove(point) {
    return point.x >= 0 && point.y >= 0 && point.x < this.settings.colsCount && point.y < this.settings.rowsCount
  }
};

game.run();

