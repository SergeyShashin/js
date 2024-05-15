'use strict';

// Убрать границы поля. Т.е. при пересечении границы поля змейка появляется с противоположной стороны.

/**
 * @type {Object} settings Настройки игры
 * @property {Number} rowsCount количество строк
 * @property {Number} colsCount количество колонок
 * @property {Number} speed скорость змейки
 * @property {Number} quantityFoodForWin количество еды для победы
 */
const settings = {
  rowsCount: 15,
  colsCount: 15,
  speed: 3,
  quantityFoodForWin: 5
};

/**
 * @type {Object} config Конфиг игры
 * @property {Object} settings
 */
const config = {
  settings,
  /**
   * Меняет настройки на пользовательские.
   * @param {Object} userSettings Настройки
   */
  init(userSettings) {
    Object.assign(this.settings, userSettings);
  },

  /**
   * @returns {Number} Возвращает количество строк
   */
  getRowsCount() {
    return this.settings.rowsCount
  },

  /**
   * @returns {Number} Возвращает количество колонок
   */
  getColsCount() {
    return this.settings.colsCount
  },

  /**
   * @returns {Number} Возвращает скорость
   */
  getSpeed() {
    return this.settings.speed
  },

  /**
   * @returns {Number} Возвращает количество еды для победы
   */
  getQuantityFoodForWin() {
    return this.settings.quantityFoodForWin
  }
};

const count = {
  countEl: null,
  currentCount: null,
  init() {
    this.countEl = document.getElementById('count');
    this.currentCount = 0;
    console.log(this.countEl);
  },
  setCount(value) {
    this.currentCount = value;
    this.countEl.textContent = this.currentCount;
  },
  growUp() {
    this.setCount(this.currentCount + 1);
  },
  getCount() {
    return this.currentCount;
  },
  getCountEl() {
    return this.countEl;
  }
}

/**
 * @type {Object} Карта
 * @property {Object} cels объект, содержащий все html элементы игры
 * @property {Object} usedCels Объект, содержащий задействованные html элементы игры
 */
const map = {
  cels: null,
  usedCels: null,

  /**
   * Создаёт карту
   * @param {HTMLElement} gameElement Table 
   * @param {Number} rows Количество строк
   * @param {Number} cols Количество колонок
   */
  init(gameElement, rows, cols) {
    this.cels = {};
    this.usedCels = [];
    for (let row = 0; row < rows; row++) {
      let tr = document.createElement('tr');
      gameElement.appendChild(tr);
      for (let col = 0; col < cols; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        this.cels[`x${col}_y${row}`] = td;
      }
    }
  },

  render(snakePoints, foodPoint) {
    for (let element of this.usedCels) {
      element.className = '';
    }

    this.usedCels = [];


    snakePoints.forEach((snakePoint, idx) => {
      let snakePointElement = this.cels[`x${snakePoint.x}_y${snakePoint.y}`];
      snakePointElement.className = idx === 0 ? 'snake-head' : 'snake-body';
      this.usedCels.push(snakePointElement);
    });

    let foodPointElement = this.cels[`x${foodPoint.x}_y${foodPoint.y}`];
    foodPointElement.className = 'food';
    this.usedCels.push(foodPointElement);
  }
};

/**
 * @type {Object} Змейка
 * @property {Array} body Тело змейки
 * @property {String} direction Направление движения змейи
 * @property {String} lastDirection Направление движения змейки в момент смены направления
 */
const snake = {
  body: null,
  direction: null,
  lastDirection: null,

  init(startPosition, direction) {
    this.body = [startPosition];
    this.direction = direction;
    this.lastDirection = direction;
  },

  getBody() {
    return this.body
  },

  makeStep(nextPoint) {
    this.body.unshift(nextPoint);
    this.body.pop();
  },

  getNextHeadPoint() {
    let headPoint = this.body[0];

    switch (this.direction) {
      case 'up':
        return { x: headPoint.x, y: headPoint.y - 1 };
      case 'down':
        return { x: headPoint.x, y: headPoint.y + 1 };
      case 'right':
        return { x: headPoint.x + 1, y: headPoint.y };
      case 'left':
        return { x: headPoint.x - 1, y: headPoint.y };
    }
  },

  setDirection(direction) {
    if (this.canSetDirection(direction)) {
      this.direction = direction;
      this.lastDirection = direction;
    }
  },

  getDirection() {
    return this.direction;
  },

  canSetDirection(direction) {
    return direction === 'up' && this.lastDirection !== 'down' ||
      direction === 'down' && this.lastDirection !== 'up' ||
      direction === 'right' && this.lastDirection !== 'left' ||
      direction === 'left' && this.lastDirection !== 'right'
  },

  growUp(point) {
    this.body.push(point);
  }
  
};

/**
 * @type {Object} Еда
 * @property {Number} x Номер колонки в которой находится еда
 * @property {Number} y Номер строки в которой находится еда
 */
const food = {
  x: null,
  y: null,
  setCoordinate(point) {
    this.x = point.x;
    this.y = point.y;
  },
  getCoordinate() {
    return { x: this.x, y: this.y }
  }
};

const statusGame = {
  currentStatus: null,
  setPlay() {
    this.currentStatus = 'play';
  },
  isPlay() {
    return this.currentStatus === 'play';
  },
  setStop() {
    this.currentStatus = 'stop';
  },
  isStop() {
    return this.currentStatus === 'stop';
  },
  setFinish() {
    this.currentStatus = 'finish';
  },
  isFinish() {
    return this.currentStatus === 'finish';
  },
}

/**
 * @type {Object} Игра
 * @property {HTMLelement} gameElement элемент игры
 * @property {Number} tickInterval Код интервала при использовании функции setInterval
 */
const game = {
  config,
  map,
  snake,
  food,
  statusGame,
  count,
  gameElement: null,
  tickInterval: null,
  playOrStopBtnEl: null,

  /**
   * Инициализация игры
   * @param {*} userSettings 
   */
  init(userSettings = {}) {
    let validateUserSettings = this.validation(userSettings);

    if (!validateUserSettings.isCorrect) {
      for (let error of validateUserSettings.errors) {
        console.error(error);
      }
      return
    }

    this.config.init(userSettings);
    this.gameElement = document.getElementById('snake-game');
    this.playOrStopBtnEl = document.getElementById('playOrStopButton');
    this.map.init(this.gameElement, this.config.getRowsCount(), this.config.getColsCount());
    this.count.init();
    this.setEventHandlers();
    this.reset();
  },

  reset() {
    this.snake.init(this.getStartPositionSnake(), 'up');
    this.food.setCoordinate(this.getRandomFreeCoordinates());
    this.render();
    this.count.setCount(0);
    this.play();
  },

  render() {
    this.map.render(this.snake.getBody(), this.food.getCoordinate());
  },

  play() {
    this.statusGame.setPlay();
    this.changeStateBtnPlayOrStop('stop', true);
    this.tickInterval = setInterval(() => this.move(), 1000 / this.config.getSpeed());
  },

  stop() {
    this.statusGame.setStop();
    this.changeStateBtnPlayOrStop('play', true);
    clearInterval(this.tickInterval);
  },

  finish() {
    this.statusGame.setFinish();
    this.changeStateBtnPlayOrStop('finish', false);
    clearInterval(this.tickInterval);
  },

  move() {
    let nextHeadPoint = this.snake.getNextHeadPoint();
    let colsCount = this.config.getColsCount();
    let rowsCount = this.config.getRowsCount();
    if (this.canMakeStep(nextHeadPoint)) {
      if (this.nextHeadPointOnFoodPoint(nextHeadPoint)) {
        this.snake.growUp(nextHeadPoint);
        this.count.growUp();
        this.food.setCoordinate(this.getRandomFreeCoordinates());
      }

      if (nextHeadPoint.x === -1) {
        this.snake.makeStep({ x: nextHeadPoint.x = colsCount - 1, y: nextHeadPoint.y });
      } else if (nextHeadPoint.x === colsCount - 1) {
        this.snake.makeStep({ x: nextHeadPoint.x = 0, y: nextHeadPoint.y });
      } else if (nextHeadPoint.y === -1) {
        this.snake.makeStep({ x: nextHeadPoint.x, y: nextHeadPoint.y = rowsCount - 1 });
      } else if (nextHeadPoint.y === rowsCount) {
        this.snake.makeStep({ x: nextHeadPoint.x, y: nextHeadPoint.y = 0 });
      } else {
        this.snake.makeStep(nextHeadPoint);
      }

      this.render();

    } else {
      this.finish();
    }
  },

  isWin() {
    return this.snake.getBody().length === this.config.getQuantityFoodForWin() + 1
  },
  isNextStepOnBodySnake(nextHeadPoint) {
    return this.snake.getBody().some(point => point.x === nextHeadPoint.x && point.y == nextHeadPoint.y)
  },

  nextHeadPointOnFoodPoint(nextHeadPoint) {
    let foodPoint = this.food.getCoordinate();
    return nextHeadPoint.x === foodPoint.x && nextHeadPoint.y === foodPoint.y;
  },

  canMakeStep(nextHeadPoint) {
    return !this.isWin()
      && !this.isNextStepOnBodySnake(nextHeadPoint)
  },

  changeStateBtnPlayOrStop(text, flag) {
    this.playOrStopBtnEl.textContent = text;
    this.playOrStopBtnEl.className = 'button-play-or-stop';
    if (!flag) {
      this.playOrStopBtnEl.classList.add('finish');
    }
  },

  setEventHandlers() {
    this.playOrStopBtnEl.addEventListener('click', () => this.handlerClickBtnPlayOrStop());
    document.getElementById('newGameButton').addEventListener('click', () => this.handlerClickBtnNewGame());
    document.addEventListener('keydown', (e) => this.handlerKeyDown(e));
  },

  handlerClickBtnPlayOrStop() {

    if (this.statusGame.isPlay()) {
      this.stop();
    } else if (this.statusGame.isStop()) {
      this.play();
    }
  },

  handlerClickBtnNewGame() {
    this.reset();
  },

  handlerKeyDown(e) {
    switch (e.code) {
      case 'ArrowUp':
        this.snake.setDirection('up');
        break;
      case 'ArrowDown':
        this.snake.setDirection('down');
        break;
      case 'ArrowRight':
        this.snake.setDirection('right');
        break;
      case 'ArrowLeft':
        this.snake.setDirection('left');
        break;
    }
  },

  getRandomFreeCoordinates() {
    let exclude = [...this.snake.getBody(), this.food.getCoordinate()];
    while (true) {
      let randomPoint = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getRowsCount())
      }
      if (!exclude.some(item => item.x === randomPoint.x && item.y === randomPoint.y)) {
        return randomPoint
      }
    }
  },

  getStartPositionSnake() {
    return { x: Math.floor(this.config.getColsCount() / 2), y: Math.floor(this.config.getRowsCount() / 2) }
  },

  /**
   * Проверяет пользовательские настройки на корректность
   * @param {Object} userSettings пользовательские настройки
   * @returns {Object} Флаг корректности настроек и ошибки
   */
  validation(userSettings) {
    const result = {
      isCorrect: true,
      errors: []
    }

    for (let parametr in userSettings) {
      switch (parametr) {
        case 'speed':
          if (userSettings[parametr] > 10 || userSettings[parametr] < 1) {
            result.isCorrect = false;
            result.errors.push('Скорость должна быть в дипазоне [от 2 до 9].');
          }
          break;
        case 'rowsCount':
          if (userSettings[parametr] > 5 || userSettings[parametr] < 30) {
            result.isCorrect = false;
            result.errors.push('Количество строк должно быть в дипазоне [от 5 до 30].');
          }
          break;
        case 'colsCount':
          if (userSettings[parametr] > 5 || userSettings[parametr] < 30) {
            result.isCorrect = false;
            result.errors.push('Количество колонок должно быть в дипазоне [от 5 до 30].');
          }
          break;
        case 'quantityFoodForWin':
          if (userSettings[parametr] > 2 || userSettings[parametr] < 10) {
            result.isCorrect = false;
            result.errors.push('Количество еды для победы должно быть в дипазоне [от 5 до 30].');
          }
          break;
      }
    }
    return result

  }
}

window.onload = () => game.init({ speed: 5 });