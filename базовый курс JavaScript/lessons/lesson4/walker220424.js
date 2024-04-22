'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  charPlayer: '0 ',
  charMap: 'X ',
  availableDirection: ['4', '6', '8', '5', 'выход']
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
    }

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

      this.player.move(direction);
      this.render();

    }
  },

  render() {
    let map = '';
    for (let col = 0; col < this.settings.colsCount; col++) {
      for (let row = 0; row < this.settings.rowsCount; row++) {
        console.log(this.player.getPosition());
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
  }

}

game.run();