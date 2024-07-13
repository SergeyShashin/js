'use strict';

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

  move(direction) {
    switch (direction) {
      case '8':
        this.y--;
        break;
      case '5':
        this.y++;
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
    this.player.init(this.settings.startPosittionPlayerX, this.settings.startPosittionPlayerY);
    this.render();
    while (true) {
      let direction = this.getDirection();
      
      if (direction === 'e') {
        alert('До встречи:)');
        return
      }
      this.player.move(direction);
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
    let availableDirection = ['4', '5', '6', '8', 'e'];
    while (true) {
      let direction = prompt(`Ваш ход [${availableDirection.join(', ')}]. Для выхода 'e'`);
      if (availableDirection.includes(direction)) {
        return direction
      }
    }
  }

}

game.run();