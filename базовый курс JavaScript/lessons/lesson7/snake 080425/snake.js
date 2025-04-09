'use strict';
const settings = {
  rowsCount: 21,
  colsCount: 21,
  winFoodCount: 1,
  speed: 1,
};

const config = {
  settings,

  init(usersettings) {
    Object.assign(this.settings, usersettings);
  },

  getRowsCount() {
    return this.settings.rowsCount
  },

  getColsCount() {
    return this.settings.colsCount
  },

  getWinFoodCount() {
    return this.settings.winFoodCount
  },

  getSpeed() {
    return this.settings.speed
  },

  validate() {
    const result = {
      isValid: true,
      errors: []
    }

    if (this.settings.rowsCount > 21) {
      result.isValid = false;
      result.errors.push('Может быть высоту поля выбрать менее 22?');
    }

    if (this.settings.rowsCount < 5) {
      result.isValid = false;
      result.errors.push('Может быть высоту поля выбрать более 4?');
    }

    if (this.settings.colsCount > 21) {
      result.isValid = false;
      result.errors.push('Может быть ширину поля выбрать менее 22?');
    }

    if (this.settings.colsCount < 5) {
      result.isValid = false;
      result.errors.push('Может быть ширину поля выбрать более 4?');
    }

    if (this.settings.winFoodCount > 15) {
      result.isValid = false;
      result.errors.push('Может быть количество еды выбрать менее 16?');
    }

    if (this.settings.winFoodCount < 1) {
      result.isValid = false;
      result.errors.push('Может быть количество еды выбрать более 1?');
    }

    if (this.settings.speed > 10) {
      result.isValid = false;
      result.errors.push('Может быть скорость выбрать менее 11?');
    }

    if (this.settings.speed < 1) {
      result.isValid = false;
      result.errors.push('Может быть скорость выбрать более 1?');
    }

    return result
  }
};

const statusGame = {
  condition: null,
};

const snake = {
  body: null,
  direction: null,
  lastStepDirection: null,

  init(startBody) {
    this.body = [startBody];
  },

  getBody() {
    return this.body;
  }
};

const food = {
  point: null,

  init(point) {
    this.point = point;
  },

  setFoodPoint(point) {
    this.point = point;
  },

  getPosition() {
    return this.point;
  }
};

const map = {
  cells: null,
  usedCells: null,
  gameEl: null,

  init(rowsCount, colsCount) {
    this.gameEl = document.getElementById('snake-game');
    this.gameEl.innerHTML = '';
    this.cells = {};
    this.usedCells = [];

    for (let row = 0; row < rowsCount; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < colsCount; col++) {
        let tdEl = document.createElement('td');
        trEl.appendChild(tdEl);
        this.cells[`x${col}_y${row}`] = tdEl;
      }
      this.gameEl.appendChild(trEl);
    }
  },

  render(snakeBody, foodPosition) {

    for (let cell of this.usedCells) {
      cell.className = '';
    }

    this.usedCells = [];

    snakeBody.map((point, idx) => {
      let cell = this.cells[`x${point.x}_y${point.y}`];
      cell.classList.add(idx === 0 ? 'snake-head' : 'snake-body');
      this.usedCells.push(cell);
    });

    let foodPooint = this.cells[`x${foodPosition.x}_y${foodPosition.y}`];
    foodPooint.classList.add('food');
    this.usedCells.push(foodPooint);
  }
};

const game = {
  config,
  statusGame,
  snake,
  food,
  map,
  numberInterval: null,

  init(userSettings = {}) {
    this.config.init(userSettings);
    let validation = this.config.validate();

    if (!validation.isValid) {
      for (let errorMsg of validation.errors) {
        console.error(errorMsg);
      }
      return
    };

    this.map.init(this.config.getRowsCount(), this.config.getColsCount());
    this.snake.init(this.getStartPointSnake());
    this.food.init({ x: null, y: null });
    this.food.setFoodPoint(this.getFreeRandomPoint());
    this.mapRender();
    this.setEventHandlers();
  },

  getStartPointSnake() {
    return { x: Math.round(this.config.getColsCount() / 2), y: Math.round(this.config.getRowsCount() / 2) }
  },

  getFreeRandomPoint() {
    let exclude = [...this.snake.getBody(), this.food.getPosition()];

    while (true) {
      const randomPoint = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getRowsCount()),
      };

      if (!exclude.some(point => point.x === randomPoint.x && point.y === randomPoint.y)) {
        return randomPoint;
      }
    }
  },

  mapRender() {
    this.map.render(this.snake.getBody(), this.getFreeRandomPoint());
  },

  setEventHandlers() {
    document.getElementById('newGameButton').addEventListener('click', () => this.reset());
  },

  reset() {
    this.mapRender();
  },

  stop() {

  },

  play() {

  },

  finish() {

  }
}

window.onload = game.init({ winFoodCount: 3, speed: 3 });