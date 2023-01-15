'use strict';

const settings = {
  rowsCount: 21,
  colsCount: 21,
  speed: 5,
  winFoodCount: 10,
};

const config = {
  settings,

  init(userSettings) {
    this.settings = Object.assign(this.settings, userSettings);
  },

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
    return this.settings.speed;
  },

  validate() {

  },

};

const status = {
  condition: null,
  setPlay() {
    this.condition = 'play';
  },

  setStop() {
    this.condition = 'stop';
  },

  setFinished() {
    this.condition = 'finished';
  },

  isPlay() {
    return this.condition === 'play';
  },

  isStop() {
    return this.condition === 'stop';
  },

};

const map = {
  cells: null,
  usedcells: null,

  init(rowsCount, colsCount) {
    let gameElement = document.getElementById('snake-game');
    this.cells = {};
    this.usedcells = [];

    for (let row = 0; row < rowsCount; row++) {
      let tr = document.createElement('tr');
      gameElement.appendChild(tr);

      for (let col = 0; col < colsCount; col++) {
        let td = document.createElement('td');
        this.cells[`x${row}_y${col}`] = td;
        tr.appendChild(td);
      }
    }
  },

  render(snakeBody, foodPosition) {
    this.cells[`x10_y10`].className = 'snake';

    for (let cell in this.cells) {
      this.cells[cell].className = '';
    }

    this.usedcells = [];

    this.cells[`x${foodPosition.x}_y${foodPosition.y}`].className = 'food';
    this.usedcells.push(foodPosition);

    snakeBody.forEach((point, idx) => {
      this.cells[`x${point.x}_y${point.y}`].classList.add(idx == 0 ? 'snake-head' : 'snake-body');
      this.usedcells.push(point);
    });

  }

};

const snake = {
  body: null,
  direction: null,
  lastDirection: null,

  init(startPosition, direction) {
    this.body = startPosition;
    this.direction = direction;
    this.lastDirection = direction;
  },

  getBody() {
    return this.body;
  },

  setDirection(direction) {
    if (this.canSetDirection(direction)) {
      this.direction = direction;
    };

  },

  canSetDirection(direction) {
    return direction === 'down' && this.lastDirection !== 'up' ||
      direction === 'up' && this.lastDirection !== 'down' ||

      direction === 'left' && this.lastDirection !== 'right' ||

      direction === 'right' && this.lastDirection !== 'left'
  }
};

const food = {
  x: null,
  y: null,

  setPosition(position) {
    this.x = position.x;
    this.y = position.y;
  },

  getPosition() {
    return {
      x: this.x,
      y: this.y
    }
  }

};

const game = {
  config,
  status,
  map,
  snake,
  food,
  interval: null,

  init(userSettings = {}) {
    this.config.init(userSettings);
    this.map.init(this.config.getRowsCount(), this.config.getColsCount());
    this.reset();
    this.setEventHandlers();


  },

  setEventHandlers() {
    let btnNewGameElement = document.getElementById('newGameButton');
    btnNewGameElement.addEventListener('click', () => this.reset());
    let btnPlayOrStopButtonElement = document.getElementById('playOrStopButton');
    btnPlayOrStopButtonElement.addEventListener('click', event => this.handlerPlayOrStop(event));
    window.document.addEventListener('keydown', event => this.keyDownHandler(event));
  },

  handlerPlayOrStop(event) {
    console.log('Написать обработку клика по кнопке Стоп/Плей/Финиш');
  },

  keyDownHandler(event) {
    switch (event.code) {
      case 'ArrowDown':
      case 'KeyS':
      case 'Numpad2':
        this.snake.setDirection('down');
        break;
      case 'ArrowUp':
      case 'KeyW':
      case 'Numpad8':
        this.snake.setDirection('up');
        break;
      case 'ArrowRight':
      case 'KeyD':
      case 'Numpad6':
        this.snake.setDirection('right');
        break;
      case 'ArrowLeft':
      case 'KeyA':
      case 'Numpad4':
        this.snake.setDirection('left');
        break;
    }

  },

  reset() {
    this.play();
    this.snake.init(this.getStartSnakePosition(), 'up');
    this.food.setPosition(this.getRandomPosition());
    this.map.render(this.snake.getBody(), this.food.getPosition());
  },

  play() {
    this.status.setPlay();
    // this.interval = setInterval(() => {
    //   console.log('Змейка ходи');

    // }, 1000 / this.config.getSpeed());

  },

  stop() {
    this.status.setStop();

  },

  finished() {
    this.status.setFinished();

  },

  getRandomPosition() {
    let rndPoint = {};
    let exclude = [...this.snake.getBody(), this.food.getPosition()];

    while (true) {
      rndPoint = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getColsCount()),
      }

      if (!exclude.some(exPoint => exPoint.x === rndPoint.x && exPoint.y === rndPoint.y)) {
        return rndPoint;
      }
    }
  },

  getStartSnakePosition() {
    return [{
      x: Math.floor(this.config.getRowsCount() / 2),
      y: Math.floor(this.config.getColsCount() / 2)
    }]

  }

};

window.onload = game.init({ speed: 3 });
