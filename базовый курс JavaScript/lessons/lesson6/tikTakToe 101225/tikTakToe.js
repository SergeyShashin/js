'use strict';

const tikTakToe = {
  gameHTMLEl: null,
  gameData: null,
  phase: null,
  status: null,
  run() {
    this.gameHTMLEl = document.getElementById('game');
    this.gameData = [
      [], [], [],
      [], [], [],
      [], [], [],
    ];
    this.phase = '+';
    this.status = 'play';

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
    e.target.textContent = this.phase;
    this.gameData[Number(e.target.dataset.row)][Number(e.target.dataset.col)] = this.phase;

    this.phase = this.phase === 0 ? '+' : 0;
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



};

window.onload = () => tikTakToe.run();