'use strict';

const tikTakToe = {
  gameHTMLEl: null,
  gameData: null,
  phase: null,
  status: null,
  counterClicks: null,

  run() {
    this.gameHTMLEl = document.getElementById('game');
    this.gameData = [
      [], [], [],
      [], [], [],
      [], [], [],
    ];
    this.phase = '+';
    this.status = 'play';
    this.counterClicks = 0;

    this.createMap();
    this.gameHTMLEl.addEventListener('click', e => this.handlerClick(e));
  },

  createMap() {
    for (let row = 0; row < 3; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < 3; col++) {
        let tdEl = document.createElement('td');
        trEl.appendChild(tdEl);
        tdEl.dataset.row = row;
        tdEl.dataset.col = col;
      }
      this.gameHTMLEl.appendChild(trEl);
    }
  },

  handlerClick(e) {
    if (!this.clickOnTD(e.target.tagName) || !this.isEmpty(e.target) || !this.statusIsPlay()) {
      return
    }
    this.counterClicks++;
    e.target.textContent = this.phase;
    this.gameData[Number(e.target.dataset.row)][Number(e.target.dataset.col)] = this.phase;

    if (this.lineIsAssembled() || this.counterClicks === 9) {
      this.status = 'final';
      this.sayFinalPhrase();
      return
    }

    this.phase = this.phase === '0' ? '+' : '0';
  },

  clickOnTD(tag) {
    return tag === 'TD';
  },

  isEmpty(tag) {
    return tag.textContent === '';
  },

  statusIsPlay() {
    return this.status === 'play';
  },

  lineIsAssembled() {
    for (let row = 0; row < 3; row++) {
      if (this.check(this.gameData[row].join(''))) {
        return true
      }
    }

    return this.check(this.gameData[0][0] + this.gameData[1][0] + this.gameData[2][0]) ||
      this.check(this.gameData[0][1] + this.gameData[1][1] + this.gameData[2][1]) ||
      this.check(this.gameData[0][2] + this.gameData[1][2] + this.gameData[2][2]) ||
      this.check(this.gameData[0][0] + this.gameData[1][1] + this.gameData[2][2]) ||
      this.check(this.gameData[0][2] + this.gameData[1][1] + this.gameData[2][0])
  },

  check(str) {
    return str === '000' || str === '+++'
  },

  sayFinalPhrase() {
    let msg = this.counterClicks === 9 ? 'Линию из 3 одинаковых элементов не собрали.' : `Линию собрали из ${this.phase}.`;
    setTimeout(() => alert(msg), 1);
  }

};

window.onload = () => tikTakToe.run();