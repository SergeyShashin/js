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
  charPlayer: '0 ',
  charMap: 'X ',
  availableDirection: ['1', '3', '7', '9', '4', '6', '8', '5', 'выход']
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
    switch (direction) {
      case '1':
        return {
          x: this.x - 1,
          y: this.y + 1
        };
      case '3':
        return {
          x: this.x + 1,
          y: this.y + 1
        }
      case '4':
        return {
          x: this.x - 1,
          y: this.y
        }
      case '6':
        return {
          x: this.x + 1,
          y: this.y
        }
      case '7':
        return {
          x: this.x - 1,
          y: this.y - 1
        }
      case '8':
        return {
          x: this.x,
          y: this.y - 1
        }
      case '5':
        return {
          x: this.x,
          y: this.y + 1
        }
      case '9':
        return {
          x: this.x + 1,
          y: this.y - 1,
        }
    }

  },

  move(position) {
    this.x = position.x;
    this.y = position.y;
  }

};

const game = {
  settings,
  player,

  run() {
    this.player.init({ x: Math.round(this.settings.rowsCount / 2), y: Math.round(this.settings.colsCount / 2) });
    this.render();
    while (true) {
      let direction = prompt(`Напечайте одно из возможных направлений ${this.settings.availableDirection}.`);

      if (!this.settings.availableDirection.includes(direction)) {
        continue
      }

      if (direction === 'выход') {
        return
      }

      let nextPosition = this.player.getNextPosition(direction);
      this.canMove(nextPosition) ? this.player.move(nextPosition) : '';

      this.render();

    }
  },

  render() {
    let map = '';
    for (let col = 0; col < this.settings.colsCount; col++) {
      for (let row = 0; row < this.settings.rowsCount; row++) {
        if (row === this.player.getPosition().x && col === this.player.getPosition().y) {
          map += this.settings.charPlayer;
        } else {
          map += this.settings.charMap;
        }
      }
      map += '\n'
    }

    console.clear();
    console.log(map);
  },

  canMove(nextPosition) {
    alert(typeof nextPosition.x);
    return nextPosition.x >= 0 &&
      nextPosition.y >= 0 &&
      nextPosition.y < this.settings.colsCount &&
      nextPosition.x < this.settings.rowsCount
  }

}

game.run();