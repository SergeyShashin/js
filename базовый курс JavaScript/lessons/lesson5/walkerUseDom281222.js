'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  positionX: 3,
  positionY: 4,
  direction: 'right',
  speed: 3,
};

const player = {
  x: null,
  y: null,
  direction: null,

  init(startX, startY, startDirection) {
    this.x = startX;
    this.y = startY;
    this.direction = startDirection;
    console.log(this.direction);
  },

  getNextStepPoint() {
    let point = {
      x: this.x,
      y: this.y
    }

    switch (this.direction) {
      case 'right':
        point.x++;
        break;
      case 'left':
        point.x--;
        break;
      case 'down':
        point.y++;
        break;
      case 'up':
        point.y--;
        break;
    }

    return point;
  },

  makeStep(nextPoint) {
    this.x = nextPoint.x;
    this.y = nextPoint.y;
  }
};

const game = {
  settings,
  player,
  gameElement: null,
  tdElements: null,
  interval: null,

  run() {
    this.init();
    this.render();

    this.interval = setInterval(() => {
      let nextStepPoint = this.player.getNextStepPoint()

      if (this.canMakeStep(nextStepPoint)) {
        console.log('идём!');
        this.player.makeStep(nextStepPoint);
        console.log(this.player);
        this.render();
      }
    }
      , 1000 / this.settings.speed
    );

  },

  init() {
    this.gameElement = document.getElementById('game');
    this.tdElements = [];
    this.player.init(this.settings.positionX, this.settings.positionY, this.settings.direction);
  },

  render() {
    this.gameElement.innerHTML = '';

    for (let row = 0; row < this.settings.rowsCount; row++) {
      let trElement = document.createElement('tr');
      this.gameElement.appendChild(trElement);

      for (let col = 0; col < this.settings.colsCount; col++) {
        let tdElement = document.createElement('td');
        trElement.appendChild(tdElement);

        if (row === this.player.y && col === this.player.y) {
          console.log(this.player);
          tdElement.classList.add('player');
        }
      }
    }
  },

  canMakeStep(nextStepPoint) {
    return nextStepPoint.x !== 0
      && nextStepPoint.y !== 0
      && nextStepPoint.x !== this.settings.rowsCount
      && nextStepPoint.y !== this.settings.colsCount;
  }
};

window.onload = game.run();