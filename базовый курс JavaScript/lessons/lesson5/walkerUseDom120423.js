'use strict';


/**
 * @type {Object} Объект с настройками.
 * @property {int} rowsCount Количество строк.
 * @property {int} colsCount Количество колонок.
 * @property {int} startPositionPlayerX Стартовая позиция игрока по оси x.
 * @property {int} startPositionPlayerY Стартовая позиция игрока по оси y.
 */
const settings = {
  rowsCount: 20,
  colsCount: 20,
  startPositionPlayerX: 10,
  startPositionPlayerY: 10,
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
        return { x: this.x + 1, y: this.y }
      case 'left':
        return { x: this.x - 1, y: this.y }
      case 'top':
        return { x: this.x, y: this.y - 1 }
      case 'down':
        return { x: this.x, y: this.y + 1 }
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
  },

  setDirection(direction) {
    this.direction = direction;
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
  interval: null,

  run() {
    this.init();
    
    this.interval = setInterval(() => {
      let nextPosition = this.player.getNextPosition(this.player.getDirection());
      if (this.canMove(nextPosition)) {
        this.player.move(nextPosition);
        this.renderMap();
      } else {
        alert('Врезались в стену. Нажмите F5 для нового старта.')
        clearInterval(this.interval);
      }
    },
      200);
  },

  init() {
    this.player.init(this.settings.startPositionPlayerX, this.settings.startPositionPlayerY, this.settings.startDirection);
    this.gameElement = document.getElementById('game');
    this.renderMap();
    this.setHandlers();
  },

  renderMap() {
    this.gameElement.innerHTML = '';
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
  },

  setHandlers() {
    window.addEventListener('keydown', (e) => this.keyDownHandler(e.code));
  },

  keyDownHandler(event) {
    switch (event) {
      case 'Numpad8':
      case 'ArrowUp':
      case 'KeyW':
        this.player.setDirection('top');
        break;
      case 'Numpad2':
      case 'ArrowDown':
      case 'KeyS':
        this.player.setDirection('down');
        break;
      case 'Numpad6':
      case 'ArrowRight':
      case 'KeyD':
        this.player.setDirection('right');
        break;
      case 'Numpad4':
      case 'ArrowLeft':
      case 'KeyA':
        this.player.setDirection('left');
        break;
    }
  },

  canMove(nextPosition) {
    return nextPosition.x >= 0 &&
      nextPosition.y >= 0 &&
      nextPosition.x < this.settings.colsCount &&
      nextPosition.y < this.settings.rowsCount
  }

}

game.run();

