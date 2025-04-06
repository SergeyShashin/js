'use strict';

const tikTakToe = {
  gameEl: null,
  map: null,
  phase: null,
  status: null,

  init() {
    this.gameEl = document.getElementById('game');
    this.map = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.phase = 'O';
    this.status = 'play';

    this.createMap();
    this.setEventHandlers();
  },

  createMap() {
    for (let row = 0; row < 3; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < 3; col++) {
        let tdEl = document.createElement('td');
        tdEl.dataset.row = row;
        tdEl.dataset.col = col;
        trEl.appendChild(tdEl);
      }
      this.gameEl.appendChild(trEl);
    }
  },

  setEventHandlers() {
    this.gameEl.addEventListener('click', (e) => this.gameElHandlerClick(e));
  },

  gameElHandlerClick(e) {
    let target = e.target;
    if (!this.isClickOnCell(e.target.tagName) || !this.isCellEmpty(target) || this.status === 'stop') {
      return
    }

    target.textContent = this.phase;
    this.map[target.dataset.row][target.dataset.col] = this.phase;
    if (this.isWin()) {
      alert(`${this.phase} собрали 3 символа.`);
      this.status = 'stop';
    }
    this.togglePhase();
  },

  isClickOnCell(tag) {
    return tag === 'TD';
  },

  togglePhase() {
    this.phase = this.phase === 'O' ? 'X' : 'O';
  },

  isCellEmpty(cell) {
    return cell.textContent === '';
  },

  isWin() {
    return this.isLineWin(this.map[0][0], this.map[0][1], this.map[0][2]) ||
      this.isLineWin(this.map[1][0], this.map[1][1], this.map[1][2]) ||
      this.isLineWin(this.map[2][0], this.map[2][1], this.map[2][2]) ||
      this.isLineWin(this.map[0][0], this.map[1][0], this.map[2][0]) ||
      this.isLineWin(this.map[0][1], this.map[1][1], this.map[2][1]) ||
      this.isLineWin(this.map[0][2], this.map[1][2], this.map[2][2]) ||
      this.isLineWin(this.map[0][0], this.map[1][1], this.map[2][2]) ||
      this.isLineWin(this.map[0][2], this.map[1][1], this.map[2][0])
  },

  isLineWin(a, b, c) {
    let line = a + b + c;
    return line === 'OOO' || line === 'XXX'
  }
};

window.onload = () => tikTakToe.init();