'use strict';

/*
Для игры, реализованной на уроке (бродилка), добавить возможность ходить по диагонали
цифрами 1, 3, 7, 9
Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, т.е. при
направлении в стенку
игрок оставался на том же месте где стоял.
*/

/**
 * @type {object} settings Объект настроек
 * @property {int} 'rowscount' Количество строк
 * @property {int} 'rowscount' Количество колонок
 * @property {int} 'playerPositionX' Номер колонки в которой находится игрок
 * @property {int} 'playerPositionY' Номер строки в которой находится игрок
 */
const settings = {
  rowscount: 10,
  colscount: 10,
  playerPositionX: 0,
  playerPositionY: 0
};

/**
 * @type {object} player Объект игрока
 * @property {int} 'x' Номер колонки в которой находится игрок
 * @property {int} 'y' Номер строки в которой находится игрок
 * @method init Устанавливает первоначальное положение игрока
 * @method makeStep Ходы игрока
 */
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
        break;
      case 1:
        this.x--;
        this.y++;
        break;
      case 4:
        this.x--;
        break;
      case 7:
        this.x--;
        this.y--;
        break;
      case 8:
        this.y--;
        break;
      case 9:
        this.y--;
        this.x++;
        break;
      case 6:
        this.x++;
        break;
      case 3:
        this.x++;
        this.y++;
        break;
    }
  }
};

/**
 * @type {object} Объект Игры
 * @method run Запуск игры
 * @method makeStep Ходы игрока
 * @method render Отображение игрового поля и игрока
 * @method getDirection Получение направления для перемещения игрока
 * @method canMakeStep Контроль за выходом за пределы игрового поля
 */
const game = {
  settings,
  player,

  run() {
    this.player.init(this.settings.playerPositionX, this.settings.playerPositionY);

    while (true) {
      this.render();

      let direction = this.getDirection();

      if (direction === -1) {
        console.log('До встречи!');
        return
      }
      
      if(this.canMakeStep(direction)){
        this.player.makeStep(direction);
      }
      
    }

  },

  render() {
    let map = '';
    for (let row = 0; row <= this.settings.rowscount; row++) {
      for (let col = 0; col <= this.settings.rowscount; col++) {
        row === this.player.y && col === this.player.x ? map += 'o ' : map += 'x ';
      }
      map += '\n';
    }
    console.clear();
    console.log(map);
  },

  getDirection() {
    let possibleDirections = [2, 1, 4, 7, 8, 9, 6, 3, -1];

    while (true) {
      let direction = parseInt(prompt(`Введите одно из возможных направлений \n ${possibleDirections.join(', ')} для выхода`));

      if (!possibleDirections.includes(direction)) {
        continue;
      } else {
        return direction;
      }
    }
  },

  canMakeStep(direction) {
    switch (direction) {
      case 2:
        return this.player.y + 1 <= this.settings.rowscount;
      case 1:
        return this.player.x - 1 >= 0 && this.player.y + 1 <= this.settings.rowscount;
      case 4:
        return this.player.x - 1 >= 0;
      case 7:
        return this.player.x - 1 >= 0 && this.player.y - 1 >= 0;
      case 8:
        return this.player.y - 1 >= 0;
      case 9:
        return this.player.x + 1 <= this.settings.colscount && this.player.y - 1 >= 0;
      case 6:
        return this.player.x + 1 <= this.settings.colscount;
      case 3:
        return this.player.x + 1 <= this.settings.colscount && this.player.y + 1 <= this.settings.rowscount;
    }

  }


};

game.run();