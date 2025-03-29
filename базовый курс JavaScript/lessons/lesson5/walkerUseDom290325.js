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
    this.playerCell = this.cells[`${playerPositionRow}, ${playerPositionCol}`];
    this.playerCell.classList.add('player');
  }


};

const game = {
  settings,
  player,
  map,

  run() {
    this.init();
  },

  init() {
    this.player.init(this.settings.startPostionRow, this.settings.startPostionCol, 'up');
    this.map.init(this.settings.rowsCount, this.settings.colsCount, this.player.getPostionRow(), this.player.getPostionCol());
    // this.map.render(this.player.getPostionRow(), this.player.getPostionCol());
  }

};

game.run();