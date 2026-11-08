'use strict';
'use strict';

const tikTakToe = {
  tikTakToeHTMLEl: null,
  phase: null,
  field: null,
  statusGame: null,
  init() {
    this.tikTakToeHTMLEl = document.getElementById('game');
    this.phase = '+';
    this.render();
    this.tikTakToeHTMLEl.addEventListener('click', e => this.clickHandler(e));
  },
  render() {
    this.field = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.statusGame = 'play';
    for (let row = 0; row < 3; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < 3; col++) {
        let tdEl = document.createElement('td');
        tdEl.dataset.row = row;
        tdEl.dataset.col = col;
        trEl.appendChild(tdEl);
      }
      this.tikTakToeHTMLEl.appendChild(trEl);
    }
  },
  clickHandler(e) {
    if (e.target.tagName !== 'TD' || !this.cellIsEmpty(e.target.dataset.row, e.target.dataset.col) || this.statusGame !== 'play') {
      return
    }
    e.target.textContent = this.phase;
    this.field[e.target.dataset.row][e.target.dataset.col] = this.phase;
    this.checkResult();
    this.phase = this.phase === '+' ? '0' : '+';

  },
  cellIsEmpty(row, col) {
    return this.field[row][col] === '';
  },
  checkResult() {
    if (this.isLineAssembled()) {
      this.statusGame = 'done';
      setTimeout(() => this.sayFinalPhrase(), 1);
    }

  },
  isLineAssembled() {
    let linePlus = '+++';
    let lineZero = '000';
    let row0 = this.field[0].join('');
    let row1 = this.field[1].join('');
    let row2 = this.field[2].join('');
    let col0 = this.field[0][0] + this.field[1][0] + this.field[2][0];
    let col1 = this.field[0][1] + this.field[1][1] + this.field[2][1];
    let col2 = this.field[0][2] + this.field[1][2] + this.field[2][2];
    let diag0 = this.field[0][0] + this.field[1][1] + this.field[2][2];
    let diag1 = this.field[0][2] + this.field[1][1] + this.field[2][0];

    return row0 === linePlus || row0 === lineZero ||
      row1 === linePlus || row1 === lineZero ||
      row2 === linePlus || row2 === lineZero ||
      col0 === linePlus || col0 === lineZero ||
      col1 === linePlus || col1 === lineZero ||
      col2 === linePlus || col2 === lineZero ||
      diag0 === linePlus || diag0 === lineZero ||
      diag1 === linePlus || diag1 === lineZero
  },
  sayFinalPhrase() {
    alert(`:) ${this.phase === '+' ? '0' : '+'} собрали линию.`);
  }

};

window.onload = () => tikTakToe.init();