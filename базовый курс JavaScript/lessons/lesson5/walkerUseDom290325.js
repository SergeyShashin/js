'use strict';
const settings = {
  rowsCount: 10,
  colsCount: 10,
  startPostionRow: 5,
  startPostionCol: 5,
  speed: 5
};

const player = {
  row: null,
  col: null,
  direction: null,

  init(col, row, direction) {
    this.row = row;
    this.col = col;
    this.direction = direction;
  },

  getPostionRow() {
    return this.row
  },

  getPostionCol() {
    return this.col
  },

  getNextPoint() {
    let point = {
      row: this.row,
      col: this.col
    }

    switch (this.direction) {
      case 'up':
        point.row--;
        break;
      case 'down':
        point.row++;
        break;
      case 'left':
        point.col--;
        break;
      case 'right':
        point.col++;
        break;
    }

    return point;
  },

  move(nextPointPlayer) {
    this.row = nextPointPlayer.row;
    this.col = nextPointPlayer.col;
  },

  setDirection(direction) {
    this.direction = direction;
  }

};

const map = {
  tableEl: null,
  rowsCount: null,
  colsCount: null,
  cells: null,
  playerCell: null,

  init(rowsCount, colsCount, playerPositionRow, playerPositionCol) {
    this.tableEl = document.getElementById('game');
    this.rowsCount = rowsCount;
    this.colsCount = colsCount;
    this.cells = {};

    for (let row = 0; row < this.rowsCount; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < this.colsCount; col++) {
        let tdEl = document.createElement('td');
        if (row === playerPositionRow && col === playerPositionCol) {
          tdEl.classList.add('player');
          this.playerCell = tdEl;
        }
        this.cells[`${row}_${col}`] = tdEl;
        trEl.appendChild(tdEl);
      }
      this.tableEl.appendChild(trEl);
    }
  },

  render(playerPositionRow, playerPositionCol) {
    this.playerCell.classList.remove('player');
    this.playerCell = this.cells[`${playerPositionRow}_${playerPositionCol}`];
    this.playerCell.classList.add('player');
  }

};

const game = {
  settings,
  player,
  map,

  run() {
    this.init();
    this.move();
    this.setEventHandlers();
  },

  init() {
    this.player.init(this.settings.startPostionRow, this.settings.startPostionCol, 'up');
    this.map.init(this.settings.rowsCount, this.settings.colsCount, this.player.getPostionRow(), this.player.getPostionCol());
  },

  move() {
    setInterval(() => {
      let nextPointPlayer = this.player.getNextPoint();
      if (this.isCanMove(nextPointPlayer)) {
        this.player.move(nextPointPlayer);
        this.map.render(nextPointPlayer.row, nextPointPlayer.col);
      }
    },
      1000 / this.settings.speed);
  },

  isCanMove(nextPointPlayer) {
    return nextPointPlayer.row >= 0 &&
      nextPointPlayer.col >= 0 &&
      nextPointPlayer.row < this.settings.rowsCount &&
      nextPointPlayer.col < this.settings.colsCount
  },

  setEventHandlers() {
    window.document.addEventListener('keydown', (e) => this.handlerKewDown(e));
  },

  handlerKewDown(e) {
    switch (e.key) {
      case 'ArrowUp':
        this.player.setDirection('up');
        break;
      case 'ArrowDown':
        this.player.setDirection('down');
        break;
      case 'ArrowLeft':
        this.player.setDirection('left');
        break;
      case 'ArrowRight':
        this.player.setDirection('right');
        break;

    }
  }

};

window.onload = game.run();