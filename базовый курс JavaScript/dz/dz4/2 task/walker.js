'use strict';

/*
Для игры, реализованной на уроке (бродилка), добавить возможность ходить по диагонали
цифрами 1, 3, 7, 9
Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, т.е. при
направлении в стенку
игрок оставался на том же месте где стоял.
*/

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
      case 1:
        this.x--;
        this.y++;
        break;
      case 4:
        this.x--;
        break;
      case 7:
        this.x--;
        this.y--;
        break;
      case 8:
        this.y--;
        break;
      case 9:
        this.y--;
        this.x++;
        break;
      case 6:
        this.x++;
        break;
      case 3:
        this.x++;
        this.y++;
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

      if (this.canMakeStep(direction)) {
        this.player.makeStep(direction);
      }


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
    let possibleDirections = [2, 1, 4, 7, 8, 9, 6, 3, -1];

    while (true) {
      let direction = parseInt(prompt(`Введите одно из возможных направлений \n ${possibleDirections.join(', ')} для выхода`));

      if (!possibleDirections.includes(direction)) {
        continue;
      } else {
        return direction;
      }
    }
  },

  canMakeStep(direction) {
    switch (direction) {
      case 2:
        return this.player.y + 1 <= this.settings.rowscount;
      case 1:
        return this.palyer.x - 1 >= 0 || this.player.y + 1 <= this.settings.rowscount;
      // case 4:
      //   this.x--;
      //   break;
      // case 7:
      //   this.x--;
      //   this.y--;
      //   break;
      // case 8:
      //   this.y--;
      //   break;
      // case 9:
      //   this.y--;
      //   this.x++;
      //   break;
      // case 6:
      //   this.x++;
      //   break;
      // case 3:
      //   this.x++;
      //   this.y++;
      //   break;
    }

  }


};

game.run();