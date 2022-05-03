'use strict';

const settings = {
  rowsCount: 15,
  colsCount: 15,
  playerStartX: 5,
  playerStartY: 5,
  playerStartDirection: 'right',
  quantityStepsPerSecond: 3
};

const player = {
  x: null,
  y: null,
  direction: null,

  setPositionXY(x, y) {
    this.x = x;
    this.y = y;
  },
  setDirection(direction) {
    this.direction = direction;
  },

  makeStep(direction) {
    let nextPoint = this.getNextPoint(direction);
    this.x = nextPoint.x;
    this.y = nextPoint.y;
  },

  getNextPoint(direction) {
    let point = {
      x: this.x,
      y: this.y
    }

    switch (direction) {
      case 'right':
        point.x++;
        break;
      case 'left':
        point.x--;
        break;
      case 'up':
        point.y--;
        break;
      case 'down':
        point.y++;
        break;
    }
    return point;
  }

};

const game = {
  settings,
  player,
  gameElement: null,

  run() {
    this.init();

    setInterval(() => {
      if (this.playerCanMakeStep()) {
        this.player.makeStep(this.player.direction);
        this.render();
      }

    }, 1000 / this.settings.quantityStepsPerSecond);
  },

  init() {
    this.gameElement = document.getElementById('game');
    window.addEventListener('keydown', e => this.changeTheDirectionOfPlayer(e));
    this.player.setPositionXY(this.settings.playerStartX, this.settings.playerStartY);
    this.player.setDirection(this.settings.playerStartDirection);
    this.render();
  },

  changeTheDirectionOfPlayer(e) {
    switch (e.key) {
      case 'ArrowRight':
      case '6':
        this.player.setDirection('right');
        break;
      case 'ArrowLeft':
      case '4':
        this.player.setDirection('left');
        break;
      case 'ArrowUp':
      case '8':
        this.player.setDirection('up');
        break;
      case 'ArrowDown':
      case '2':
        this.player.setDirection('down');
        break;
    }


  },

  render() {
    this.gameElement.innerHTML = '';
    for (let row = 0; row <= this.settings.rowsCount; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col <= this.settings.colsCount; col++) {
        let td = document.createElement('td');
        if (row === this.player.y && col === this.player.x) {
          td.classList.add('player');
        }
        tr.appendChild(td);
      }
      this.gameElement.appendChild(tr);
    }
  },

  playerCanMakeStep() {
    let nextPlayerPoint = this.player.getNextPoint();
    return nextPlayerPoint.y > 0 && nextPlayerPoint.y < this.settings.rowsCount &&
      nextPlayerPoint.x > 0 && nextPlayerPoint.x < this.settings.colsCount
  }

};

window.onLoad = game.run();