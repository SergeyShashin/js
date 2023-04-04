'use strict';

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
      case '2':
        this.y++;
        break;
      case '8':
        this.y--;
        break;
      case '4':
        this.x--;
        break;
      case '6':
        this.x++;
        break;
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
        this.player.move(direction);
        this.render();
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
    let possibleDirection = ['2', '4', '6', '8', '-1'];

    while (true) {
      let direction = prompt(`Введите одно из возможных направлений ${possibleDirection.join(', ')}.\nДля выхода '-1'.`);

      if (possibleDirection.includes(direction)) {
        return direction;
      }
    }
  }
};

game.run();