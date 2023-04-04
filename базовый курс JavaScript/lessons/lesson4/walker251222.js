'use strict';
/**
 * Настройки игры
 * @property {number} Количество строк игрового поля rowsCount.
 * @property {number} Количество колонок игрового поля colsCount.
 * @property {number} Стартовая позиция игрока по X positionX.
 * @property {number} Стартовая позиция игрока по Y positionY.
 */
const settings = {
  rowsCount: 10,
  colsCount: 10,
  positionX: 5,
  positionY: 5,
};

/**
 * Игрок
 * @property {number} Позиция игрока по оси x. X
 * @property {number} Позиция игрока по оси x. Y
 * @method init Инициализация игрока.
 * @method move Перемещения игрока.
 */
const player = {
  x: null,
  y: null,

  init(positionX, positionY) {
    this.x = positionX;
    this.y = positionY;
  },

  move(direction) {

    switch (direction) {
      case 2:
        this.y++
        break;
      case 8:
        this.y--
        break;
      case 6:
        this.x++
        break;
      case 4:
        this.x--
        break;
    }
  }

};

/**
 * Игра.
 * @property {Object} 
 * @property {Object}
 * @method run Старт игры.
 * @method render Отображение игрового поля и игрока.
 * @method getDirection Получаение направления для перемещения игрока.
 */
const game = {
  settings,
  player,
  run() {
    this.player.init(this.settings.positionX, this.settings.positionY);
    while (true) {
      this.render();
      let direction = this.getDirection();
      if (direction === -1) {
        alert('До свидания');
        return;
      }
      this.player.move(direction);
      this.render();
    }
  },

  render() {
    let map = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.rowsCount; col++) {
        if (row === this.player.y && col === this.player.x) {
          map += 'o ';
        } else {
          map += 'x ';
        }
      }
      map += '\n'
    }
    console.clear();
    console.log(map);

  },

  getDirection() {
    let availableDirection = [-1, 2, 8, 4, 6];

    while (true) {
      let direction = parseInt(prompt(`Введите направление ${availableDirection.join(' ')}`));
      if (availableDirection.includes(direction)) {
        return direction;
      }
    }
  }
};

game.run();