'use strict';
/*
Для игры, реализованной на уроке (бродилка), добавить возможность ходить по диагонали
цифрами 1, 3, 7, 9
Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, т.е. при
направлении в стенку
игрок оставался на том же месте где стоял.
*/

const settings = {
  startPosittionPlayerX: 0,
  startPosittionPlayerY: 0,
  rowsCount: 10,
  colsCount: 10,
  signPlayer: 'P ',
  signMap: 'X '
};

const player = {
  x: null,
  y: null,

  init(x, y) {
    this.x = x;
    this.y = y;
  },

  move(nextPoint) {
    this.x = nextPoint.x;
    this.y = nextPoint.y;
  },

  getNextPoint(direction) {
    let nextX;
    let nextY;
    switch (direction) {
      case '8':
        nextX = this.x;
        nextY = this.y - 1;
        break;
      case '7':
        nextY = this.y - 1;
        nextX = this.x - 1;
        break;
      case '9':
        nextY = this.y - 1;
        nextX = this.x + 1;
        break;
      case '5':
        nextY = this.y + 1;
        nextX = this.x;
        break;
      case '1':
        nextY = this.y + 1;
        nextX = this.x - 1;
        break;
      case '3':
        nextY = this.y + 1;
        nextX = this.x + 1;
        break;
      case '4':
        nextY = this.y;
        nextX = this.x - 1;
        break;
      case '6':
        nextY = this.y;
        nextX = this.x + 1;
        break;
    }
    return { x: nextX, y: nextY };


  }

};

const game = {
  settings,
  player,

  run() {
    this.player.init(this.settings.startPosittionPlayerX, this.settings.startPosittionPlayerY);
    this.render();
    while (true) {
      let direction = this.getDirection();

      if (direction === 'e') {
        alert('До встречи:)');
        return
      }
      let nextPoint = this.player.getNextPoint(direction);
      if (this.canStep(nextPoint)) {
        this.player.move(nextPoint);
      }
      this.render();
    }
  },

  render() {
    let map = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {
        if (row === this.player.y && col === this.player.x) {
          map += this.settings.signPlayer;
        } else {
          map += this.settings.signMap;
        }
      }
      map += '\n'
    }

    console.clear();
    console.log(map);
  },

  getDirection() {
    let availableDirection = ['4', '5', '6', '8', '7', '9', '1', '3', 'e'];
    while (true) {
      let direction = prompt(`Ваш ход [${availableDirection.join(', ')}]. Для выхода 'e'`);
      if (availableDirection.includes(direction)) {
        return direction
      }
    }
  },

  canStep(nextPoint) {
    return nextPoint.x >= 0 &&
      nextPoint.y >= 0 &&
      nextPoint.x < this.settings.colsCount &&
      nextPoint.y < this.settings.rowsCount
  }

}

game.run();