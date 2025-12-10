'use strict';

const tikTakToe = {
  gameHTMLEl: null,
  game: null,
  phase: null,
  run() {
    this.gameHTMLEl = document.getElementById('game');
    this.game = [
      [], [], [],
      [], [], [],
      [], [], [],
    ];
    this.phase = '+';

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
    if (e.target.tagName !== 'TD') {
      return
    }
    e.target.textContent = this.phase;
    this.phase = this.phase === 0 ? '+' : 0;
  }

};

window.onload = () => tikTakToe.run();