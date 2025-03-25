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

  move(direction) {
    switch (direction) {
      case '4':
        this.x--
        break;
      case '6':
        this.x++
        break;
      case '8':
        this.y--
        break;
      case '5':
        this.y++
        break;
      case '1':
        this.y++;
        this.x--;
        break;
      case '3':
        this.y++;
        this.x++;
        break;
      case '7':
        this.y--;
        this.x--;
        break;
      case '9':
        this.y--;
        this.x++;
        break;
    }
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

      this.player.move(direction);
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
  }
};

game.run();

