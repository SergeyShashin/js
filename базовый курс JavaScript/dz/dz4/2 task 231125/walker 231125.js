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
  startPositionY: 5
}

const player = {
  x: null,
  y: null,
  init(x, y) {
    this.x = x;
    this.y = y
  },
  getNextPoint(direction) {
    let x = this.x;
    let y = this.y;
    switch (direction) {
      case 8:
        y--;
        break;
      case 7:
        y--;
        x--;
        break;
      case 5:
        y++
        break;
      case 9:
        y--;
        x++;
        break;
      case 4:
        x--;
        break;
      case 1:
        y++;
        x--;
        break;
      case 6:
        x++;
        break;
      case 3:
        y++;
        x++;
        break;
    }
    return { x: x, y: y }

  },
  move(nextPoint) {
    this.x = nextPoint.x
    this.y = nextPoint.y
  },
}

const game = {
  settings,
  player,
  run() {
    this.player.init(this.settings.startPositionX, this.settings.startPositionY);
    this.render();
    while (true) {
      let direction = this.getDirection();

      if (direction === -1) {
        return alert('До встречи)');
      }

      let nextPoint = this.player.getNextPoint(direction);
      if (this.canMove(nextPoint)) {
        this.player.move(nextPoint);
        this.render();
      }
    }

  },
  render() {
    let map = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {
        row === this.player.y && col === this.player.x ? map += ':) ' : map += 'o  ';
      }
      map += '\n'
    }
    console.clear();
    console.log(map);
  },
  getDirection() {
    let variants = [1, 3, 4, 5, 6, 7, 8, 9, - 1];
    let direction;
    while (!variants.includes(direction)) {
      direction = Number(prompt(`Варианты ${variants.join(' ')}. Для выхода -1.`));
    }
    return direction
  },
  canMove(nextPoint) {
    return nextPoint.x > -1 && nextPoint.y > -1 && nextPoint.x < this.settings.colsCount && nextPoint.y < this.settings.colsCount;
  }
}

window.onload = () => game.run();