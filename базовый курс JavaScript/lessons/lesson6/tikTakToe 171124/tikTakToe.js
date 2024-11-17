'use strict';

const settings = {
  rowsCount: 3,
  colsCount: 3,
};

const game = {
  settings,
  map: null,
  phase: null,
  status: null,
  gameEl: null,
  counterClick: null,

  init() {

    this.map = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.phase = '0';
    this.status = 'play';
    this.counterClick = 0;
    this.gameEl = document.getElementById('game');
    this.createGameMap();
    this.setEventHanlers();

  },

  createGameMap() {
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < this.settings.colsCount; col++) {
        let tdEl = document.createElement('td');
        tdEl.dataset.row = row;
        tdEl.dataset.col = col;
        trEl.appendChild(tdEl);
      }
      this.gameEl.appendChild(trEl);
    }
  },

  setEventHanlers() {
    this.gameEl.addEventListener('click', e => this.setPhaseToTdEl(e));
  },

  setPhaseToTdEl(e) {
    if (
      e.target.tagName !== 'TD'
      || this.status !== 'play'
      || this.map[Number(e.target.dataset.row)][Number(e.target.dataset.col)] !== ''
      || this.counterClick === 9) {
      return
    }
    this.counterClick++;
    e.target.textContent = this.phase;
    this.map[Number(e.target.dataset.row)][Number(e.target.dataset.col)] = this.phase;
    this.checkWin();
    this.phase = this.phase === '0' ? this.phase = 'X' : this.phase = '0';
  },

  checkWin() {
    if (this.isWin()) {
      this.status = 'stop';
      this.sayWin();
    }
    if (this.counterClick === 9) {
      return console.log('Дружбанити)')
    }
  },

  isWin() {
    return this.isLineWin(this.map[0][0], this.map[0][1], this.map[0][2]) ||
      this.isLineWin(this.map[1][0], this.map[1][1], this.map[1][2]) ||
      this.isLineWin(this.map[2][0], this.map[2][1], this.map[2][2]) ||
      this.isLineWin(this.map[0][0], this.map[1][1], this.map[2][2]) ||
      this.isLineWin(this.map[0][2], this.map[1][1], this.map[2][0]) ||
      this.isLineWin(this.map[0][0], this.map[1][0], this.map[2][0]) ||
      this.isLineWin(this.map[0][1], this.map[1][1], this.map[2][1]) ||
      this.isLineWin(this.map[0][2], this.map[1][2], this.map[2][2])
    // this.map[0][0] === 'X' && this.map[0][1] === 'X' && this.map[0][2] === 'X' ||
    //   this.map[1][0] === 'X' && this.map[1][1] === 'X' && this.map[1][2] === 'X' ||
    //   this.map[2][0] === 'X' && this.map[2][1] === 'X' && this.map[2][2] === 'X' ||
    //   this.map[0][0] === 'X' && this.map[1][1] === 'X' && this.map[2][2] === 'X' ||
    //   this.map[0][2] === 'X' && this.map[1][1] === 'X' && this.map[2][0] === 'X' ||
    //   this.map[0][0] === 'X' && this.map[1][0] === 'X' && this.map[2][0] === 'X' ||
    //   this.map[0][1] === 'X' && this.map[1][1] === 'X' && this.map[2][1] === 'X' ||
    //   this.map[0][2] === 'X' && this.map[1][2] === 'X' && this.map[2][2] === 'X' ||

    // this.map[0][0] === '0' && this.map[0][1] === '0' && this.map[0][2] === '0' ||
    // this.map[1][0] === '0' && this.map[1][1] === '0' && this.map[1][2] === '0' ||
    // this.map[2][0] === '0' && this.map[2][1] === '0' && this.map[2][2] === '0' ||
    // this.map[0][0] === '0' && this.map[1][1] === '0' && this.map[2][2] === '0' ||
    // this.map[0][2] === '0' && this.map[1][1] === '0' && this.map[2][0] === '0' ||
    // this.map[0][0] === '0' && this.map[1][0] === '0' && this.map[2][0] === '0' ||
    // this.map[0][1] === '0' && this.map[1][1] === '0' && this.map[2][1] === '0' ||
    // this.map[0][2] === '0' && this.map[1][2] === '0' && this.map[2][2] === '0';
  },

  isLineWin(a, b, c) {
    return a + b + c === 'XXX' || a + b + c === '000'
  },

  sayWin() {
    return console.log(`${this.phase} заполнили линию.`);
  }

}


game.init();