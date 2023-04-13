'use strict';


/**
 * @type {Object} Объект с настройками.
 * @property {int} rowsCount Количество строк.
 * @property {int} colsCount Количество колонок.
 * @property {int} startPositionPlayerX Стартовая позиция игрока по оси x.
 * @property {int} startPositionPlayerY Стартовая позиция игрока по оси y.
 */
const settings = {
  rowsCount: 10,
  colsCount: 10,
  startPositionPlayerX: 5,
  startPositionPlayerY: 5,
  startDirection: 'right'
}


/**
 * @type {Object} Объект игрока.
 * @property {int} x Положение игрока по оси x.
 * @property {int} y Положение игрока по оси y.
 * @property {string} direction Направление игрока. 
 * @method init Устанавливает игрока в стартовое положение. 
 */
const player = {
  x: null,
  y: null,
  direction: null,

  /**
   * Устанавливает игрока в стартовое положение.
   * @param {*} startX Положение игрока по оси x.
   * @param {*} startY  Положение игрока по оси y.
   * @param {*} direction Направление игрока.
   */
  init(startX, startY, direction) {
    this.x = startX;
    this.y = startY;
    this.direction = direction;
  },

  /**
   * Возвращает текущую позицию игрока
   * @returns {Object} Текущая позиция игрока
   */
  getPosition() {
    return { x: this.x, y: this.y }
  },

  /**
   * Возвращает текущее направление игрока
   * @returns {string} Текущая направление игрока
   */
  getDirection() {
    return this.direction;
  },

  /**
   * Возвращает координаты точки, где будет игрок, если сделает ход.
   * @param {string} direction Направление игрока. 
   * @returns {object} Кординаты точки, где будет игрок, если сделает ход.
   */
  getNextPosition(direction) {
    switch (direction) {
      case 'right':
        return { x: this.x++, y: this.y }
      case 'left':
        return { x: this.x--, y: this.y }
      case 'top':
        return { x: this.x, y: this.y++ }
      case 'bottom':
        return { x: this.x, y: this.y-- }
      default:
        return console.error(`Ошибочное направление ${direction}`);
    }
  },

  /**
   * Перемещается в нужную позицию. 
   * @param {Object} position 
   */
  move(position) {
    this.x = position.x;
    this.y = position.y;
  }
}

/**
 * @type {Object} Объект игры.
 */
const game = {
  settings,
  player,
  gameElement: null,
  gameCells: [],

  run() {
    this.init();

  },

  init() {
    this.player.init(this.settings.startPositionPlayerX, this.settings.startPositionPlayerY, this.settings.startDirection);
    this.gameElement = document.getElementById('game');
    this.renderMap();
  },

  renderMap() {
    this.gameElement.innerHtml = '';
    let positionPlayer = this.player.getPosition();
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let rowElement = document.createElement('tr');
      for (let col = 0; col < this.settings.colsCount; col++) {
        let colElement = document.createElement('td');
        rowElement.appendChild(colElement);
        if (positionPlayer.y === row && positionPlayer.x === col) {
          colElement.classList.add('player');
        }
      }
      this.gameElement.appendChild(rowElement);
      this.gameCells.push(rowElement);
    }

    document.body.appendChild(this.gameElement);
  }

}

game.run();

