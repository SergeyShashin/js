'use strict';


// Выводить счёт игры в режиме реального времени.

const settings = {
  rowsCount: 21,
  colsCount: 21,
  speed: 5,
  winFoodCount: 5,
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
    return this.settings.winFoodCount;
  },

  validate() {
    let isValid = true;
    let errors = [];

    if (this.getSpeed() < 1 || this.getSpeed() > 10) {
      isValid = false;
      errors.push('Диапазон скорости [1-10]')
    }

    if (this.getWinFoodCount() < 5 || this.getWinFoodCount > 20) {
      isValid = false;
      errors.push('Диапазон еды для победы [5-20]')
    }

    if (this.getRowsCount() < 10 || this.getRowsCount() > 25) {
      isValid = false;
      errors.push('Диапазон строк [10-25]')
    }
    if (this.getColsCount() < 10 || this.getColsCount() > 25) {
      isValid = false;
      errors.push('Диапазон колонок [10-25]')
    }
    return {
      isValid: isValid,
      errors: errors,
    }
  },

};

const score = {
  scoreCurent: null,
  scoreElement: null,
  growUp() {
    this.scoreCurent++;
    this.scoreElement.textContent = this.scoreCurent;
  }
}

const statusGame = {
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

    for (let cell in this.cells) {
      this.cells[cell].className = '';
    }

    this.usedcells = [];

    this.cells[`x${foodPosition.x}_y${foodPosition.y}`].className = 'food';
    this.usedcells.push(foodPosition);

    snakeBody.forEach((point, idx) => {
      this.cells[`x${point.x}_y${point.y}`].classList.add(idx == 0 ? 'snake-head' : 'snake-body');
      this.usedcells.push(snakeBody);
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
      this.lastDirection = direction;
    };

  },

  makeStep() {
    this.body.unshift(this.getNextHeadPoint());
    this.body.pop();
  },

  getNextHeadPoint() {
    let headPoint = this.body[0];
    switch (this.direction) {
      case 'up':
        return { x: headPoint.x - 1, y: headPoint.y };
      case 'right':
        return { x: headPoint.x, y: headPoint.y + 1 };
      case 'down':
        return { x: headPoint.x + 1, y: headPoint.y };
      case 'left':
        return { x: headPoint.x, y: headPoint.y - 1 };
    }
  },

  canSetDirection(direction) {
    return direction === 'down' && this.lastDirection !== 'up' ||
      direction === 'up' && this.lastDirection !== 'down' ||

      direction === 'left' && this.lastDirection !== 'right' ||

      direction === 'right' && this.lastDirection !== 'left'
  },

  growUp(foodCoordinates) {
    this.body.push(foodCoordinates);
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
  statusGame,
  map,
  snake,
  food,
  score,
  interval: null,
  btnNewGameElement: null,
  btnPlayOrStopButtonElement: null,

  init(userSettings = {}) {
    this.config.init(userSettings);
    let validation = this.config.validate();
    if (!validation.isValid) {
      validation.errors.forEach(el => console.error(el));
      return
    };

    this.score.scoreCurent = 0,
      this.score.scoreElement = document.getElementById('score'),

      this.map.init(this.config.getRowsCount(), this.config.getColsCount());
    this.btnNewGameElement = document.getElementById('newGameButton');
    this.btnPlayOrStopButtonElement = document.getElementById('playOrStopButton');
    this.setEventHandlers();
    this.reset();

  },

  setEventHandlers() {
    this.btnNewGameElement.addEventListener('click', () => this.reset());
    this.btnPlayOrStopButtonElement.addEventListener('click', () => this.handlerPlayOrStop());
    window.document.addEventListener('keydown', event => this.keyDownHandler(event));
  },

  handlerPlayOrStop() {
    if (this.statusGame.isPlay()) {
      this.stop();
    } else if (this.statusGame.isStop()) {
      this.play();
    };
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
    clearInterval(this.interval);
    this.btnPlayOrStopButtonElement.className = 'button-play-or-stop';
    this.play();
    this.snake.init(this.getStartSnakePosition(), 'up');
    this.food.setPosition(this.getRandomPosition());
    this.render();
  },

  render() {
    this.map.render(this.snake.getBody(), this.food.getPosition());
  },

  play() {
    this.changeTextBtn('Stop');
    this.statusGame.setPlay();
    this.interval = setInterval(() => {
      if (this.isWin() || !this.canMakeStep()) {
        return this.finished();
      }

      if (this.stepOnFood()) {
        this.snake.growUp(this.food.getPosition());
        this.food.setPosition(this.getRandomPosition());
        this.score.growUp();
      }

      this.snake.makeStep();
      this.render();

    }, 1000 / this.config.getSpeed());


  },

  stop() {
    this.changeTextBtn('Play');
    this.statusGame.setStop();
    clearInterval(this.interval);

  },

  finished() {
    this.statusGame.setFinished();
    this.changeTextBtn('End', true);
    clearInterval(this.interval);
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
    },]

  },

  canMakeStep() {
    let snakeHead = this.snake.getBody()[0];
    return this.snake.direction === 'up' && snakeHead.x > 0 ||
      this.snake.direction === 'down' && snakeHead.x < this.config.getRowsCount() - 1 ||
      this.snake.direction === 'left' && snakeHead.y > 0 ||
      this.snake.direction === 'right' && snakeHead.y < this.config.getColsCount() - 1
  },

  changeTextBtn(textBtn, isFinished = false) {
    this.btnPlayOrStopButtonElement.textContent = textBtn;

    if (isFinished) {
      this.btnPlayOrStopButtonElement.textContent = textBtn;
      this.btnPlayOrStopButtonElement.classList.add('finish');
    }
  },

  stepOnFood() {
    let foodLocation = this.food.getPosition();
    let snakeHead = this.snake.getBody()[0];
    return foodLocation.x === snakeHead.x && foodLocation.y === snakeHead.y;
  },

  isWin() {
    return this.config.getWinFoodCount() === this.snake.getBody().length;
  }

};

window.onload = game.init({ speed: 9 });
