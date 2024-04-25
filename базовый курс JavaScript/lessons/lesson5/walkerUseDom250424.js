'use strict';


const settings = {
  rowsCount: 10,
  colsCount: 10,
  startPositionPlayerX: 5,
  startPositionPlayerY: 5,
  stepInSecond: 3,
  startDirection: 'up',
  keyUp: 38,
  keyDown: 40,
  keyLeft: 37,
  keyRight: 39

};

const player = {
  x: null,
  y: null,
  direction: null,

  init(startPositionPlayerX, startPositionPlayerY, startDirection) {
    this.x = startPositionPlayerX;
    this.y = startPositionPlayerY;
    this.direction = startDirection;
  },

  setDirection(direction) {
    this.direction = direction;
  },

  getNextStepPoint() {
    let point = { x: this.x, y: this.y };

    switch (this.direction) {
      case 'up':
        point.x--;
        break;
      case 'down':
        point.x++;
        break;
      case 'left':
        point.y--;
        break;
      case 'right':
        point.y++;
        break;
    }

    return point;
  },

  move(point) {
    this.x = point.x;
    this.y = point.y;
  },

};

const game = {
  settings,
  player,
  gameElement: null,
  cels: [],

  run() {
    this.init();
    setInterval(() => {
      let nexStepPoint = this.player.getNextStepPoint();
      if (this.canMove(nexStepPoint)) {
        this.player.move(nexStepPoint);
        this.render();
      }

    }, 1000 / this.settings.stepInSecond);
  },

  init() {
    this.gameElement = document.getElementById('game');
    this.player.init(this.settings.startPositionPlayerX, this.settings.startPositionPlayerY, this.settings.startDirection);
    this.initCels();
    this.setEventHandlers();
  },

  initCels() {
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let tr = document.createElement('tr');
      this.gameElement.appendChild(tr);

      for (let col = 0; col < this.settings.colsCount; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.id = `x${row}_y${col}`;
        this.cels.push(td);
        if (row === this.settings.startPositionPlayerX && col === this.settings.startPositionPlayerY) {
          td.className = 'player';
        }
      }
    }
  },

  setEventHandlers() {
    document.addEventListener('keydown', e => this.handlerKeydown(e));
  },

  handlerKeydown(e) {
    switch (e.keyCode) {
      case this.settings.keyDown:
        this.player.setDirection('down');
        break;
      case this.settings.keyUp:
        this.player.setDirection('up');
        break;
      case this.settings.keyLeft:
        this.player.setDirection('left');
        break;
      case this.settings.keyRight:
        this.player.setDirection('right');
        break;
    }
  },

  render() {
    this.cels.forEach(el => {
      el.className = '';
    });

    document.getElementById(`x${this.player.x}_y${this.player.y}`).className = 'player';

  },

  canMove(point) {
    return point.x >= 0 && point.y >= 0 && point.x < this.settings.rowsCount && point.y < this.settings.colsCount
  }

};

game.run();