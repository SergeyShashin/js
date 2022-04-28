'use strict';

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
        console.log(this.y);
        break;
      case 4:
        this.x++;
        break;
      case 8:
        this.y--;
        break;
      case 6:
        this.x++;
        break;
    }
  }
};

const game = {
  settings,
  player,

  run() {
    while (true) {
      this.player.init(this.settings.playerPositionX, this.settings.playerPositionY);
      this.render();
      let direction = this.getDirection();

      console.log(direction);

      if (direction === -1) {
        console.log('До встречи!');
        return
      }

      this.player.makeStep(direction);

      this.render();
    }

  },

  render() {
    let map = '';
    for (let row = 0; row <= this.settings.rowscount; row++) {
      for (let col = 0; col <= this.settings.rowscount; col++) {
        row === this.player.x && col === this.player.y ? map += 'o' : map += 'x';
      }
      map += '\n';
    }
    console.clear();
    console.log(map);
  },

  getDirection() {
    let possibleDirections = [2, 4, 8, 6, -1];
    let direction;

    while (true) {
      direction = parseInt(prompt(`Введите одно из возможных направлений ${possibleDirections.join(', ')} -1 для выхода`));

      if (!possibleDirections.includes(direction)) {
        continue;
      } else {
        return direction;
      }
    }
  }

};

game.run();