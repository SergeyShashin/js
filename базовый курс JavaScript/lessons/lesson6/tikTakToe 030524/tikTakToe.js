'use strict';

const game = {
  map: null,
  mapElemnts: null,
  gameElement: null,
  status: null,
  phase: null,

  init() {
    this.gameElement = document.getElementById('game');
    this.map = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.mapElemnts = {};
    this.render();
    this.phase = 'X';
    this.status = 'play';
    this.gameElement.addEventListener('click', (e) => this.handlerClickTd(e));
  },

  render() {
    this.gameElement.innerHTML = '';
    for (let row = 0; row < 3; row++) {
      let tr = document.createElement('tr');
      this.gameElement.appendChild(tr);
      for (let col = 0; col < 3; col++) {
        let td = document.createElement('td');
        td.dataset.row = row;
        td.dataset.col = col;
        tr.appendChild(td);
        this.mapElemnts[`row${row}_col${col}`] = td;
      }
    }
  },

  handlerClickTd(e) {
    let row = Number(e.target.dataset.row);
    let col = Number(e.target.dataset.col);

    if (!this.clickTd(e.target.tagName) || !this.tdIsEmpty(row, col) || !this.statusIsPlay()) {
      return
    }

    this.map[row][col] = this.phase;
    this.mapElemnts[`row${row}_col${col}`].textContent = this.phase;

    if (this.isWin()) {
      this.status = `Победили ${this.phase}.`;
      setTimeout(() => { confirm(`${this.status} Ещё?`) ? this.init() : alert('До встречи)') }, 100);
    };

    this.togglePhase();
  },

  clickTd(tagName) {
    return tagName === 'TD';
  },

  tdIsEmpty(row, col) {
    return this.map[row][col] === '';
  },

  statusIsPlay() {
    return this.status === 'play';
  },

  togglePhase() {
    this.phase = this.phase === 'X' ? 'O' : 'X';

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
  },

  isLineWin(a, b, c) {
    return a + b + c === 'XXX' || a + b + c === 'OOO';
  }


}

window.onload = () => game.init();