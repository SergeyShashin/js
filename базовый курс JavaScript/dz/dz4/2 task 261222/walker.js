'use strict';

/*
Для игры, реализованной на уроке (бродилка), добавить возможность ходить по диагонали
цифрами 1, 3, 7, 9
Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, т.е. при
направлении в стенку
игрок оставался на том же месте где стоял.
*/

const settings = {
  rowsCount: 10,
  colsCount: 10,
  positionX: 5,
  positionY: 5,
};

const player = {
  x: null,
  y: null,

  init(positionX, positionY) {
    this.x = positionX;
    this.y = positionY;
  },

  move(direction) {

    switch (direction) {
      case 2:
        this.y++
        break;
      case 8:
        this.y--
        break;
      case 6:
        this.x++
        break;
      case 4:
        this.x--
        break;
      case 7:
        this.x--
        this.y--
        break;
      case 9:
        this.x++
        this.y--
        break;
      case 1:
        this.x--
        this.y++
        break;
      case 3:
        this.x++
        this.y++
        break;
    }
  }

};

const game = {
  settings,
  player,
  run() {

    this.player.init(this.settings.positionX, this.settings.positionY);

    while (true) {
      this.render();
      let direction = this.getDirection();
      if (direction === -1) {
        alert('До свидания!');
        return;
      }
      if (this.canStep(direction)) {
        this.player.move(direction);
        this.render();
      }

      this.render();
    }
  },

  canStep(direction) {
    switch (direction) {
      case 2:
        return this.player.y + 1 !== this.settings.rowsCount;
      case 8:
        return this.player.y - 1 !== -1;
      case 6:
        return this.player.x + 1 !== this.settings.colsCount;
      case 4:
        return this.player.x - 1 !== -1;
      case 7:
        return this.player.y - 1 !== -1 && this.player.x - 1 !== -1;
      case 9:
        return this.player.x + 1 !== this.settings.colsCount && this.player.y - 1 !== -1;
      case 1:
        return this.player.x - 1 !== -1 && this.player.y + 1 !== this.settings.rowsCount;
      case 3:
        return this.player.x + 1 !== this.settings.colsCount && this.player.y + 1 !== this.settings.rowsCount;
    }
  },

  render() {
    let map = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.rowsCount; col++) {
        if (row === this.player.y && col === this.player.x) {
          map += 'o ';
        } else {
          map += 'x ';
        }
      }
      map += '\n'
    }
    console.clear();
    console.log(map);

  },

  getDirection() {
    let availableDirection = [2, 8, 4, 6, 7, 9, 1, 3, - 1];

    while (true) {
      let direction = parseInt(prompt(`Введите направление ${availableDirection.join(' ')} для выхода.`));
      if (availableDirection.includes(direction)) {
        return direction;
      }
    }
  }
};

game.run();