'use strict';

// Выводить счёт игры в режиме реального времени.

const settings = {
  rowsCount: 21,
  colsCount: 21,
  winFoodCount: 7,
  speed: 5,
};

const config = {
  settings,

  init(userSettings) {
    Object.assign(this.settings, userSettings);
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
  }
};

const map = {
  cels: null,
  usedCels: null,
  gameElement: null,

  init(rowsCount, colsCount) {
    this.cels = {};
    this.usedCels = [];
    this.gameElement = document.getElementById('snake-game');

    for (let row = 0; row < rowsCount; row++) {
      let tr = document.createElement('tr');
      this.gameElement.appendChild(tr);
      for (let col = 0; col < colsCount; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        this.cels[`x${col}_y${row}`] = td;
      }
    }
  },

  render(snake, food) {

    for (let el of this.usedCels) {
      el.className = '';
    }

    this.usedCels = [];

    snake.map((point, idx) => {
      let cell = this.cels[`x${point.x}_y${point.y}`];
      cell.classList.add(idx === 0 ? 'snake-head' : 'snake-body');
      this.usedCels.push(cell);
    });

    let foodCell = this.cels[`x${food.x}_y${food.y}`];
    foodCell.className = 'food';
    this.usedCels.push(foodCell);
  }
};

const snake = {
  body: null,
  direction: null,
  lastStepDirection: null,

  init(startPosition, direction) {
    this.body = [{ x: startPosition.x, y: startPosition.y }];
    this.direction = direction;
    this.lastStepDirection = direction;
  },

  getBody() {
    return this.body;
  },

  setDirection(direction) {
    if (this.canSetDirection(direction)) {
      this.direction = direction;
      this.lastStepDirection = direction;
    }
  },

  getNextHeadPoint() {
    let x = this.body[0].x;
    let y = this.body[0].y;

    switch (this.direction) {
      case 'up':
        return { x: x, y: --y }
      case 'down':
        return { x: x, y: ++y }
      case 'right':
        return { x: ++x, y: y }
      case 'left':
        return { x: --x, y: y }
    }
  },

  canSetDirection(direction) {
    switch (direction) {
      case 'up':
        return this.lastStepDirection !== 'down'
      case 'down':
        return this.lastStepDirection !== 'up'
      case 'right':
        return this.lastStepDirection !== 'left'
      case 'left':
        return this.lastStepDirection !== 'right'
    }
  },

  doStep(nextPoint) {
    this.body.unshift(nextPoint);
    this.body.pop();
  },

  growUp() {
    this.body.unshift(this.getNextHeadPoint());
  }
};

const food = {
  x: null,
  y: null,

  init(startPosition) {
    this.x = startPosition.x,
      this.y = startPosition.y
  },

  getPosition() {
    return { x: this.x, y: this.y }
  },

  setNewFood(newFood) {
    this.x = newFood.x,
      this.y = newFood.y
  }

};

const status = {
  condition: null,

  setPlay() {
    this.condition = 'play';
  },

  setStop() {
    this.condition = 'stop';
  },

  setFinish() {
    this.condition = 'finish';
  },

  isPlay() {
    return this.condition === 'play';
  },

  isStop() {
    return this.condition === 'stop';
  },

  isFinish() {
    this.condition === 'finish';
  },

};

const countGame = {
  count: null,
  countElement: null,
  init() {
    this.count = 0;
    this.countElement = document.getElementById('count');
  },

  setCount(curentCount) {
    this.countElement.textContent = `Счёт игры: ${curentCount}`;
  },

  updateCount() {
    this.count++;
    this.countElement.textContent = `Счёт игры: ${this.count}`;
  }

}

const game = {
  config,
  map,
  snake,
  food,
  status,
  countGame,
  playOrStopButton: null,
  newGameButton: null,
  interval: null,

  init(userSettings = {}) {
    this.config.init(userSettings);
    this.map.init(this.config.getRowsCount(), this.config.getColsCount());
    this.countGame.init();
    this.playOrStopButton = document.getElementById('playOrStopButton');
    this.newGameButton = document.getElementById('newGameButton');
    this.reset();
    this.setEventHandlers();
  },

  reset() {
    this.snake.init(this.getStartPositionSnake(), 'up');
    this.food.init(this.getRandomFreeCoordinates());
    this.playOrStopButton.classList.remove('finish');
    this.countGame.setCount(0);
    this.render();
    this.stop();
  },

  setEventHandlers() {
    this.playOrStopButton.addEventListener('click', () => this.hadlerClickPlayOrStop());
    this.newGameButton.addEventListener('click', () => this.handlerClickNewGame());
    document.addEventListener('keydown', (e) => this.handlerKeydown(e));
  },

  getStartPositionSnake() {
    return {
      x: Math.floor(this.config.getColsCount() / 2), y: Math.floor(this.config.getRowsCount() / 2)
    }
  },

  getRandomFreeCoordinates() {
    let explode = [...this.snake.getBody(), this.food.getPosition()];

    while (true) {
      let randomCoordinates = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getRowsCount())
      };

      if (!explode.some(el => el.x === randomCoordinates.x && el.y === randomCoordinates.y)) {
        return randomCoordinates;
      };
    }
  },

  hadlerClickPlayOrStop() {
    if (this.status.isPlay()) {
      this.stop();
    } else if (this.status.isStop()) {
      this.play();
    }
  },

  handlerClickNewGame() {
    this.reset();
  },

  handlerKeydown(e) {
    switch (e.code) {
      case 'ArrowUp':
      case 'Numpad8':
        this.snake.setDirection('up');
        break;
      case 'ArrowDown':
      case 'Numpad5':
      case 'Numpad2':
        this.snake.setDirection('down');
        break;
      case 'ArrowRight':
      case 'Numpad6':
        this.snake.setDirection('right');
        break;
      case 'ArrowLeft':
      case 'Numpad4':
        this.snake.setDirection('left');
        break;
    }
  },

  play() {
    this.status.setPlay();
    this.changePlayOrButton('Stop');
    this.tikHandler();
  },

  stop() {
    this.status.setStop();
    this.changePlayOrButton('Play');
    clearInterval(this.interval);
  },

  finish() {
    this.status.setFinish();
    this.changePlayOrButton('Finish', true);
    clearInterval(this.interval);
  },

  tikHandler() {
    this.interval = setInterval(() => {
      if (!this.canMakeStep(this.snake.getNextHeadPoint()) || this.isWin()) {
        this.finish();
        return
      }

      if (this.nextStepOnFood()) {
        this.snake.growUp();
        this.countGame.updateCount();
        this.render();

        if (!this.isWin()) {
          this.food.setNewFood(this.getRandomFreeCoordinates());
        }
      }

      this.snake.doStep(this.snake.getNextHeadPoint());
      this.render();
    }, 1000 / this.config.getSpeed());
  },

  render() {
    this.map.render(this.snake.getBody(), this.food.getPosition());
  },

  canMakeStep(nextPoint) {
    return nextPoint.x >= 0 && nextPoint.y >= 0
      && nextPoint.x < this.config.getColsCount()
      && nextPoint.y < this.config.getRowsCount() && !this.nextPoinOnBodySnake(nextPoint);
  },

  changePlayOrButton(textContent, isDisable = false) {
    this.playOrStopButton.textContent = textContent;

    if (isDisable) {
      this.playOrStopButton.classList.add('finish');
    }

  },

  nextStepOnFood() {
    let nextStepSnake = this.snake.getNextHeadPoint();
    let pointFood = this.food.getPosition();
    return nextStepSnake.x === pointFood.x && nextStepSnake.y === pointFood.y
  },

  nextPoinOnBodySnake(nextPoint) {
    let bodySnake = this.snake.getBody();
    return bodySnake.some(point => point.x === nextPoint.x && point.y === nextPoint.y);
  },

  isWin() {
    return this.config.getWinFoodCount() === this.snake.getBody().length - 1;
  }


};

game.init({ speed: 5 });