'use strict';

const tikTakToe = {
  HTMLElement: null,
  map: null,
  phase: null,
  status: null,
  countClick: null,

  init() {
    this.HTMLElement = document.getElementById('game');
    this.HTMLElement.innerHTML = '';
    this.countClick = 0;
    this.phase = 1;
    this.map = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.statusPlay = true;
    this.render();
    this.HTMLElement.addEventListener('click', (e) => this.handlerClick(e));
  },

  render() {
    for (let row = 0; row < 3; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < 3; col++) {
        let td = document.createElement('td');
        td.dataset.row = row;
        td.dataset.col = col;
        tr.appendChild(td);
      }
      this.HTMLElement.appendChild(tr);
    }
  },

  handlerClick(e) {
    let currentClickRow = e.target.dataset.row;
    let currentClickCol = e.target.dataset.col;
    if (e.target.tagName !== 'TD' || this.statusPlay === false || e.target.textContent) {
      return
    }

    this.countClick++;
    e.target.textContent = this.phase;
    this.map[currentClickRow][currentClickCol] = this.phase;

    if (this.isWin()) {
      this.statusPlay = false;
      this.sayFinalWinPhrase();
      return
    }

    if (this.countClick === 9) {
      this.statusPlay = false;
      setTimeout(() => {
        alert('Баланс.');
        this.offerNewGme();
      }, 1);
      return
    }

    this.phase = this.phase == 0 ? 1 : 0;

  },

  isWin() {
    return (this.map[0][0] + this.map[0][1] + this.map[0][2]) === 3 ||
      (this.map[0][0] + this.map[0][1] + this.map[0][2]) === 0 ||
      (this.map[1][0] + this.map[1][1] + this.map[1][2]) === 3 ||
      (this.map[1][0] + this.map[1][1] + this.map[1][2]) === 0 ||
      (this.map[2][0] + this.map[2][1] + this.map[2][2]) === 3 ||
      (this.map[2][0] + this.map[2][1] + this.map[2][2]) === 0 ||

      (this.map[0][0] + this.map[1][0] + this.map[2][0]) === 3 ||
      (this.map[0][0] + this.map[1][0] + this.map[2][0]) === 0 ||
      (this.map[0][1] + this.map[1][1] + this.map[2][1]) === 3 ||
      (this.map[0][1] + this.map[1][1] + this.map[2][1]) === 0 ||
      (this.map[0][2] + this.map[1][2] + this.map[2][2]) === 3 ||
      (this.map[0][2] + this.map[1][2] + this.map[2][2]) === 0 ||

      (this.map[0][0] + this.map[1][1] + this.map[2][2]) === 3 ||
      (this.map[0][0] + this.map[1][1] + this.map[2][2]) === 0 ||
      (this.map[0][2] + this.map[1][1] + this.map[2][0]) === 3 ||
      (this.map[0][2] + this.map[1][1] + this.map[2][0]) === 0
  },

  sayFinalWinPhrase() {
    setTimeout(() => {
      alert(`${this.phase} победили.`);
      this.offerNewGme();
    }, 1);
  },

  offerNewGme() {
    confirm('Играем?') ? tikTakToe.init() : alert('До встречи.');
  }

}

window.onload = () => tikTakToe.init();

