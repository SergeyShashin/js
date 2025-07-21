'use strict';

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

  setPosition(direction) {
    switch (direction) {
      case '4':
        this.x--;
        break;
      case '5':
        this.y++;
        break;
      case '8':
        this.y--;
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
    player.init({ x: this.settings.colsCount / 2, y: this.settings.rowsCount / 2 });
    this.render();
    while (true) {
      let direction = this.getDirection();
      console.log(direction);
      if (direction === '-1') {
        return console.log('До встречи)');
      }
      this.player.setPosition(direction);
      this.render();
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
    let possibleDirection = ['4', '5', '6', '8', '-1'];
    while (true) {
      let direction = prompt(`Куда шагнём?\nВозможные варианты: [${possibleDirection.join(' ')}].\nДля выхода -1.`);
      if (possibleDirection.includes(direction)) {
        return direction
      }
    }
  }
};

game.run()

