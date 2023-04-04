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
  colwsCount: 10,
  startPlayerX: 5,
  startPlayerY: 5
};

const player = {
  x: null,
  y: null,

  init(startPlayerX, startPlayerY) {
    this.x = startPlayerX;
    this.y = startPlayerY;
  },

  move(direction) {
    switch (direction) {
      case '1':
        this.x--
        this.y++;
        break;
      case '2':
        this.y++;
        break;
      case '3':
        this.x++
        this.y++;
        break;
      case '7':
        this.x--;
        this.y--;
        break;
      case '8':
        this.y--;
        break;
      case '9':
        this.x++;
        this.y--;
        break;
      case '4':
        this.x--;
        break;
      case '6':
        this.x++;
        break;
    }
  },

  getPosition() {
    return {
      x: this.x,
      y: this.y
    }
  }
};

const game = {
  settings,
  player,

  run() {
    this.player.init(this.settings.startPlayerX, this.settings.startPlayerY);
    this.render();

    setTimeout(() => {
      while (true) {
        let direction = this.getDirection();
        if (this.playerWillBeAbleMakeMove(direction)) {
          this.player.move(direction);
          this.render();
        }
        if (direction === '-1') {
          return alert('Возвращайтесь.');
        }
      }
    }, 4000);

  },

  render() {
    let map = '';

    for (let i = 0; i < this.settings.rowsCount; i++) {
      for (let j = 0; j < this.settings.colwsCount; j++) {
        if (i === this.player.y && j === this.player.x) {
          map += '0 ';
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
    let possibleDirection = ['1', '2', '3', '4', '6', '7', '8', '9', '-1'];

    while (true) {
      let direction = prompt(`Введите одно из возможных направлений ${possibleDirection.join(', ')}.\nДля выхода '-1'.`);

      if (possibleDirection.includes(direction)) {
        return direction;
      }
    }
  },

  playerWillBeAbleMakeMove(direction) {
    let currentPositionPlayer = this.player.getPosition();
    switch (direction) {
      case '1':
        return currentPositionPlayer.x-- > 0 && currentPositionPlayer.y++ < this.settings.rowsCount - 1;
      case '2':
        return currentPositionPlayer.y++ < this.settings.rowsCount - 1;
      case '3':
        return currentPositionPlayer.x++ < this.settings.colwsCount - 1 && currentPositionPlayer.y++ < this.settings.rowsCount - 1;
      case '7':
        return currentPositionPlayer.x-- > 0 && currentPositionPlayer.y-- > 0;
      case '8':
        return currentPositionPlayer.y-- > 0;
      case '9':
        return currentPositionPlayer.x++ < this.settings.colwsCount - 1 && currentPositionPlayer.y-- > 0;
      case '4':
        return currentPositionPlayer.x-- > 0;
      case '6':
        return currentPositionPlayer.x++ < this.settings.colwsCount - 1;
    }

  }
};

game.run();