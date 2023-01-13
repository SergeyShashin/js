'use strict';

const settings = {
  winFoodCount: 20,
  rowsCount: 21,
  colsCount: 21,
  speed: 5
};

const config = {

  settings,

  getRowsCount() {
    return this.settings.rowsCount;
  },

  getColsCount() {
    return this.settings.colsCount;
  },

  getSpeed() {
    return this.settings.speed;
  },

  getWinFoodCount() {
    return this.settings.winFoodCount;
  },

  init(usersettings) {
    Object.assign(this.settings, usersettings);

  }

};

const statusGame = {
  condition: null,
  setStatusPlay() {
    this.condition = 'play';
  },

  setStatusStop() {
    this.condition = 'stop';
  },

  setStatusFinish() {
    this.condition = 'finish';
  },

  isStatusPlay() {
    return this.condition === 'play';
  },

  isStatusPlay() {
    return this.condition === 'stop';
  },

  isStatusFinish() {
    return this.condition === 'finish';
  },
};

const map = {
  gameElement: null,
  cells: null,
  usedCells: null,

  init(rows, cols) {
    this.gameElement = document.getElementById('snake-game');
    this.cells = {};
    this.usedCells = [];
    for (let row = 0; row < rows; row++) {
      let tr = document.createElement('tr');
      this.gameElement.appendChild(tr);
      for (let col = 0; col < cols; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        this.cells[`x${row}_y${col}`] = td;
      }
    }
  },

  getUsedCells() {
    return this.usedCells;
  }

};

const snake = {
  body: null,
  direction: null,
  lastDirection: null,

  init(startPositionX, startPositionY, direction) {
    this.body = [`x${startPositionX}_y${startPositionY}`];
    this.direction = direction;
    this.lastDirection = direction;
  },

  getBody() {
    return this.body;
  },

  setDirection(direction) {
    if (direction === 'right' && this.lastDirection !== 'left') {
      this.direction = 'right';
      this.lastDirection = 'right';
    }

    if (direction === 'left' && this.lastDirection !== 'right') {
      this.direction = 'left';
      this.lastDirection = 'left';
    }

    if (direction === 'up' && this.lastDirection !== 'down') {
      this.direction = 'up';
      this.lastDirection = 'up';
    }

    if (direction === 'down' && this.lastDirection !== 'up') {
      this.direction = 'down';
      this.lastDirection = 'down';
    }

  }

};

const food = {
  x: null,
  y: null,

  init(startPosition) {
    this.x = startPosition.x;
    this.y = startPosition.y;
  },

  getPoint() {
    return { x: this.x, y: this.y }
  }
};

const game = {
  config,
  statusGame,
  map,
  snake,
  food,
  newGameButtonElement: null,
  playOrStopButtonElement: null,

  init(usersettings = {}) {
    this.config.init(usersettings);

    let validation = this.validation();

    if (!validation.isValid) {
      validation.errors.forEach(error => console.log(error));
      return
    }

    this.map.init(this.config.getRowsCount(), this.config.getColsCount());

    this.snake.init(this.config.getRowsCount() / 2, this.config.getColsCount() / 2, 'up');

    this.food.init(this.getRandomFreeCoordinates());

    this.newGameButtonElement = document.getElementById('newGameButton');
    this.playOrStopButtonElement = document.getElementById('playOrStopButton');

    this.setEventHandlers();

  },

  setEventHandlers() {
    window.addEventListener('keydown', (event) => this.keyDownHandler(event));
    this.newGameButtonElement.addEventListener('click', () => this.reset());
    this.playOrStopButtonElement.addEventListener('click', (event) => this.playOrStopButtonElementClickHandler(event));
  },

  playOrStopButtonElementClickHandler(event) {
    //toDo
  },

  keyDownHandler(event) {
    switch (event.code) {
      case 'ArrowRight':
      case 'Numpad6':
      case 'KeyD':
        return this.snake.setDirection('right');
      case 'ArrowLeft':
      case 'Numpad4':
      case 'KeyA':
        return this.snake.setDirection('left');
      case 'ArrowUp':
      case 'Numpad8':
      case 'KeyW':
        return this.snake.setDirection('up');
      case 'ArrowDown':
      case 'Numpad5':
      case 'KeyS':
        return this.snake.setDirection('down');
    }

  },

  getRandomFreeCoordinates() {
    let usedCoordinates = this.map.getUsedCells();
    let exclude = [...this.snake.getBody(), this.food.getPoint()];

    while (true) {
      let point = {
        x: Math.floor(Math.random() * this.config.getRowsCount()),
        y: Math.floor(Math.random() * this.config.getColsCount())
      }
      if (!exclude.some(exPoint => exPoint.x === point.x && exPoint.y === point.y)) {
        return point;
      }
    }

  },

  validation() {
    let isValid = true;
    let errors = [];

    if (this.config.getRowsCount() < 5 || this.config.getRowsCount() > 30) {
      isValid = false;
      errors.push('Количество строк должно быть больше 5 или меньше 30');
    }

    if (this.config.getColsCount() < 5 || this.config.getColsCount() > 30) {
      isValid = false;
      errors.push('Количество колонок должно быть больше 5 или меньше 30');
    }

    if (this.config.getSpeed() < 3 || this.config.getSpeed() > 10) {
      isValid = false;
      errors.push('Скорость должна быть больше 3 или меньше 10');
    }

    if (this.config.getWinFoodCount() < 3 || this.config.getWinFoodCount() > 30) {
      isValid = false;
      errors.push('Скорость должна быть больше 3 или меньше 30');
    }

    return {
      isValid: isValid,
      errors: errors
    }
  }

};

window.onload = game.init({ speed: 7, rowsCount: 12, colsCount: 12 });