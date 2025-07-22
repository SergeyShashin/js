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
};

const player = {
  x: null,
  y: null,

  init(startPosition) {
    this.x = startPosition.x;
    this.y = startPosition.y;
  },

  getPosition() {
    return { x: this.x, y: this.y }
  },

  getNextPosition(direction) {
    let nextPosition = Object.create(this.getPosition());
    switch (direction) {
      case '1':
        nextPosition.x--;
        nextPosition.y++;
        break;
      case '7':
        nextPosition.x--;
        nextPosition.y--;
        break;
      case '9':
        nextPosition.x++;
        nextPosition.y--;
        break;
      case '3':
        nextPosition.x++;
        nextPosition.y++;
        break;
      case '4':
        nextPosition.x--;
        break;
      case '5':
        nextPosition.y++;
        break;
      case '8':
        nextPosition.y--;
        break;
      case '6':
        nextPosition.x++;
        break;
    }
    return nextPosition
  },

  setPosition(position) {
    this
  }
    
};

const game = {
  settings,
  player,

  run() {
    player.init({ x: this.settings.colsCount / 2, y: this.settings.rowsCount / 2 });
    this.render();
    while (true) {
      let direction = this.getDirection();
      console.log(direction);
      if (direction === '-1') {
        return console.log('До встречи)');
      }
      this.player.setPosition(direction);
      console.log(this.player.getNextPosition(direction));
      // this.render();
    }
  },

  render() {
    let map = '';
    let postionPlayer = this.player.getPosition();
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {
        map += row === postionPlayer.y && col === postionPlayer.x ? '0 ' : 'x ';
      }
      map += '\n';
    }
    console.clear();
    console.log(map);
  },

  getDirection() {
    let possibleDirection = ['1', '3', '7', '9', '4', '5', '6', '8', '-1'];
    while (true) {
      let direction = prompt(`Куда шагнём?\nВозможные варианты: [${possibleDirection.join(' ')}].\nДля выхода -1.`);
      if (possibleDirection.includes(direction)) {
        return direction
      }
    }
  }
};

game.run()

