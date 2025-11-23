'use strict';

const settings = {
  colsCount: 10,
  rowsCount: 10,
  startPositionX: 5,
  startPositionY: 5
}

const player = {
  x: null,
  y: null,
  init(x, y) {
    this.x = x;
    this.y = y
  },
  move(direction) {
    switch (direction) {
      case 8:
        this.y--
        break;
      case 5:
        this.y++
        break;
      case 4:
        this.x--
        break;
      case 6:
        this.x++
        break;
    }

  }
}

const game = {
  settings,
  player,
  run() {
    this.player.init(this.settings.startPositionX, this.settings.startPositionY);
    this.render();
    while (true) {
      let direction = this.getDirection();

      if (direction === -1) {
        return alert('До встречи)');
      }

      this.player.move(direction);
      this.render();
    }

  },
  render() {
    let map = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {
        row === this.player.y && col === this.player.x ? map += ':) ' : map += 'o  ';
      }
      map += '\n'
    }
    console.clear();
    console.log(map);
  },
  getDirection() {
    let variants = [4, 5, 6, 8, -1];
    let direction;
    while (!variants.includes(direction)) {
      direction = Number(prompt(`Варианты ${variants.join(' ')}. Для выхода -1.`));
    }
    return direction
  }
}

window.onload = () => game.run();