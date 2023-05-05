'use strict';

/**
 * @type {Object} Настройки игры
 */
const settings = {
  rowsCount: 20,
  colsCount: 20,
  speed: 9,
  winFoodCount: 5
};

/**
 * @type {Object} Конфиг. Отдаёт и устанавливает настройки игры.
 */
const config = {
  settings,

  /**
   * Инициализация конфигурации
   * @param {Object} userSettings Настройки от пользователя
   */
  init(userSettings) {
    this.settings = Object.assign(this.settings, userSettings);
  },

  validate() {
    let flag = true;
    let errors = [];

    if (this.getRowsCount() < 5 || this.getRowsCount() > 30) {
      errors.push('Количество строк должно быть больше 5 и меньше 30.');
    }

    if (this.getColsCount() < 5 || this.getColsCount() > 30) {
      errors.push('Количество колонок должно быть больше 5 и меньше 30.');
    }

    if (this.getSpeed() < 3 || this.getSpeed() > 10) {
      errors.push('Скорость должна быть больше 3 и меньше 10.');
    }

    if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 20) {
      errors.push('Количество еды для победы должно быть больше 5 и меньше 20.');
    }

    if (errors.length > 0) {
      flag = false;
    }

    return {
      flag: flag,
      errors: errors
    }

  },

  /**
   * Возвращает количество строк
   */
  getRowsCount() {
    return this.settings.rowsCount
  },

  /**
   * Возвращает количество колонок
   */
  getColsCount() {
    return this.settings.colsCount
  },

  /**
   * Возвращает количество еды, которое нужно съесть для завершения игры
   */
  getWinFoodCount() {
    return this.settings.winFoodCount
  },

  /**
   * Возвращает скорость
   */
  getSpeed() {
    return this.settings.speed
  },
};

/**
 * @type {Object} Карта
 */
const map = {
  cells: null,
  usedCells: null,
  gameElement: null,

  /**
   * Инициализация карты
   */
  init(rowsCount, colsCount) {
    this.gameElement = document.getElementById('snake-game');
    this.gameElement.innerHTML = '';
    this.cells = {};
    this.usedCells = [];
    for (let row = 0; row < rowsCount; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < colsCount; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        this.cells[`x${col}_y${row}`] = td;
      }
      this.gameElement.appendChild(tr);
    }
  },

  /**
   * Перерисовка карты, змейки на карте и еды на карте
   * @param {Object} snakeBody
   * @param {Object} foodCoordinates
   */
  render(snakeBody, foodCoordinates) {
    for (const cell of this.usedCells) {
      cell.className = 'cell';
    }

    this.usedCells = [];

    let foodElement = this.cells[`x${foodCoordinates.x}_y${foodCoordinates.y}`];
    foodElement.className = 'food';
    this.usedCells.push(foodElement);

    snakeBody.forEach((snakePoint, idx) => {
      let snakeElement = this.cells[`x${snakePoint.x}_y${snakePoint.y}`];
      idx === 0 ? snakeElement.className = 'snake-head' : snakeElement.className = 'snake-body';
      this.usedCells.push(snakeElement);
    });

  },

  /**
   * 
   * @returns Возвращает объект со всеми ячейками игрового поля
   */
  getCells() {
    return this.cells
  },

  /**
   * 
   * @returns Возвращает массив с занятыми ячейками игрового поля
   */
  getUsedCells() {
    return this.usedCells;
  },

  setUsedCells(point) {
    this.usedCells.push(point);
  }
};


/**
 * @type {Object} Змейка
 */
const snake = {
  body: null,
  direction: null,
  lastDirection: null,
  nextHeadPoint: null,

  /**
   * Инициализация змейки
   * @param {Number} startPosition Стартовое положение змейки
   * @param {String} direction Стартовое направление змейки
   */
  init(startPosition, direction) {
    this.body = [startPosition];
    this.direction = direction;
    this.lastDirection = direction;
  },

  /** 
   * @returns {Array} Возвращает координаты тела змейки
   */
  getBody() {
    return this.body
  },

  /** 
   * @returns {String} Возвращает направление змейки
   */
  getDirection() {
    return this.direction
  },

  /** 
   * @param {String} direction Устанавливает направление змейки
   */
  setDirection(direction) {
    this.direction = direction
  },

  /** 
   * @returns {String} Возвращает последнее направление змейки
   */
  getLastDirection() {
    return this.lastDirection
  },

  /** 
   * @returns {String} Устанавливает последнее направление змейки
   */
  setLastDirection(direction) {
    this.lastDirection = direction
  },

  /** 
   * @returns {Object} Возвращает следующую позицию головы змейки
   */
  getNextPosition() {
    let head = this.body[0];
    switch (this.direction) {
      case 'up':
        return { x: head.x, y: head.y-- }
      case 'down':
        return { x: head.x, y: head.y++ }
      case 'right':
        return { x: head.x++, y: head.y }
      case 'left':
        return { x: head.x--, y: head.y }
    }
  },

  /**
   * Увеличение размеров змейки
   * @param {Object} nextPosition 
   */
  growUp(nextPosition) {
    this.body.push(nextPosition);
  },

  /**
   * Змейка делает шаг
   */
  makeStep() {
    this.body.unshift(this.getNextPosition());
    this.body.pop();
  },

};

/**
 * @type {Object} Еда
 */
const food = {
  x: null,
  y: null,

  /**
   * 
   * @param {Object} startPosition 
   */
  setFoodCoordinates(startPosition) {
    this.x = startPosition.x;
    this.y = startPosition.y;
  },

  /** 
   * @returns {Object} Возвращает координаты еды 
   */
  getFoodCoordinates() {
    return { x: this.x, y: this.y }
  },

};

/**
 * @type {Object} Статус
 */
const statusGame = {
  condition: null,

  setStop() {
    this.condition = 'stop';
  },

  setFinish() {
    this.condition = 'finish';
  },

  setPlay() {
    this.condition = 'play';
  },

  isPlaying() {
    return this.condition === 'play';
  },

  isFinish() {
    return this.condition === 'finish';
  },

  isStoped() {
    return this.condition === 'stop';
  },
};

/**
 * @type {Object} Игра
 */
const game = {
  config,
  map,
  snake,
  food,
  statusGame,
  interval: null,

  /**
   * Инициализация игры
   * @param {Object} userSettings Пользовательские настройки 
   */
  init(userSettings) {
    this.config.init(userSettings);

    let validation = this.config.validate();
    if (!validation.flag) {
      validation.errors.forEach(error => console.error(error));
      return
    }
    map.init(this.config.getRowsCount(), this.config.getColsCount());

    this.snake.init(this.getStartPositionSnake(), 'up');

    this.food.setFoodCoordinates(this.getRandomFreeCoordinates());

    this.setEventHandlers();

    this.render();

    this.play();

  },

  /**
   * Перересовывает карту
   */
  render() {
    this.map.render(this.snake.getBody(), this.food.getFoodCoordinates());
  },

  /**
   * Останавливает игру
   */
  stop() {
    this.statusGame.setStop();
    this.changeButton('Play');
    clearInterval(this.interval);
  },

  /**
   * Возобнобвляет игру
   */
  play() {
    this.statusGame.setPlay();
    this.changeButton('Stop');
    this.interval = setInterval(() => {
      let nextPosition = this.snake.getNextPosition();
      let foodPosition = this.food.getFoodCoordinates();
      if (this.canMakeStep(nextPosition)) {
        if (this.isNextStepOnFood(nextPosition, foodPosition)) {
          this.snake.growUp(nextPosition);
          this.food.setFoodCoordinates(this.getRandomFreeCoordinates());
        }
        this.snake.makeStep();
        this.render();
      } else {
        this.finish();
        return
      }
    }, 1000 / this.config.getSpeed());
  },

  isNextStepOnFood(nextPosition, foodPosition) {
    return nextPosition.x === foodPosition.x && nextPosition.y === foodPosition.y
  },

  /**
   * Завершает игру
   */
  finish() {
    this.statusGame.setFinish();
    clearInterval(this.interval);
    this.changeButton('finish', true);
  },

  /**
   *Устанавливает слушателей событий 
   */
  setEventHandlers() {
    document.getElementById('playOrStopButton').addEventListener('click', (e) => {
      if (this.statusGame.isPlaying()) {
        this.stop();
      } else if (this.statusGame.isStoped()) {
        this.play();
      }
    });

    document.getElementById('newGameButton').addEventListener('click', () => {
      this.changeButton('Stop', false);
      map.init(this.config.getRowsCount(), this.config.getColsCount());
      this.snake.init(this.getStartPositionSnake(), 'up');
      this.food.setFoodCoordinates(this.getRandomFreeCoordinates());
      this.render();
      this.play();
    });

    document.addEventListener('keydown', (e) => this.keyDownHandler(e));
  },

  keyDownHandler(e) {
    if (this.statusGame.isFinish()) {
      return
    }
    let direction = this.snake.getDirection();
    switch (e.code) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
    }

    this.snake.lastDirection = this.snake.getDirection();

    if (this.canSetDirection(direction)) {
      this.snake.direction = direction;
    }

    this.render();
  },

  canSetDirection(direction) {
    let lasdirection = this.snake.lastDirection;
    return direction === 'up' && lasdirection !== 'down' ||
      direction === 'down' && lasdirection !== 'up' ||
      direction === 'left' && lasdirection !== 'right' ||
      direction === 'right' && lasdirection !== 'left'
  },

  /** 
   * @returns {Object} Возвращает стартовую позицию головы змейки
   */
  getStartPositionSnake() {
    return {
      x: Math.floor(this.config.getColsCount() / 2),
      y: Math.floor(this.config.getRowsCount() / 2)
    }
  },

  /** 
   * @returns {Object} Возвращает объект со свободными x и y
   */
  getRandomFreeCoordinates() {
    while (true) {
      const randomPoint = {
        x: Math.floor(Math.random() * this.config.getRowsCount()),
        y: Math.floor(Math.random() * this.config.getColsCount())
      };

      let usedCells = [this.food.getFoodCoordinates(), ...this.snake.getBody()];

      if (!usedCells.some(usedPoint => usedPoint.x === randomPoint.x && usedPoint.y === randomPoint.y)) {
        return randomPoint;
      }
    }
  },

  /**
   * Меняет текст и цвет кнопки PLAY или STOP
   * @param {String} text Текст кнопки
   * @param {Boolean} isDisable Состояние кнопки
   */
  changeButton(text, isDisable = false) {
    let buttonElement = document.getElementById('playOrStopButton');
    buttonElement.textContent = text;

    if (isDisable) {
      buttonElement.classList.add('finish');
    } else {
      buttonElement.classList.remove('finish');
    }
  },

  /**
   * Контролирует границы поля
   * @param {Object} nextHeadPoint Следующая точка головы змейки 
   * @returns {boolean} Возращает true, если можно сделать ход
   */
  canMakeStep(nextHeadPoint) {
    return nextHeadPoint.x >= 0 &&
      nextHeadPoint.y >= 0 &&
      nextHeadPoint.x - 1 < this.config.getColsCount() &&
      nextHeadPoint.y - 1 < this.config.getRowsCount()
  },

};

window.onload = () => game.init({ speed: 3 });
