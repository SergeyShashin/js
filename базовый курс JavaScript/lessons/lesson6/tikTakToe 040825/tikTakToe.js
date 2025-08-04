'use strict';
const map = {
  gameEl: null,
  mapArr: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  init() {
    this.gameEl = document.getElementById('game');

    for (let row = 0; row < 3; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < 3; col++) {
        let tdEl = document.createElement('td');
        trEl.appendChild(tdEl);
        tdEl.dataset.row = row;
        tdEl.dataset.col = col;
      }
      this.gameEl.appendChild(trEl);
    }
  },
  getGameEl() {
    return this.gameEl;
  },
  setCoordinates({ row, col }, phase) {
    this.mapArr[row][col] = phase;
  },
  tdIsEmpty({ row, col }) {
    return this.mapArr[row][col] === '';
  }

};

const tikTakToe = {
  map,
  phase: null,
  status: null,
  init() {
    this.phase = '(^_^)';
    this.map.init();
    this.setEventHandlers();
    this.status = 'play';
  },
  setEventHandlers() {
    this.map.getGameEl().addEventListener('click', e => this.handlerCLickMap(e));
  },
  handlerCLickMap(e) {
    let eTarget = e.target;
    if (eTarget.tagName !== 'TD' || !this.map.tdIsEmpty(eTarget.dataset) || !this.statusPlay()) {
      return
    }
    eTarget.textContent = this.phase;
    this.map.setCoordinates(eTarget.dataset, this.phase);
    this.togglePhase();
  },
  togglePhase() {
    this.phase = this.phase === '(^_^)' ? '(*_*)' : '(^_^)';
  },
  statusPlay() {
    return this.status === 'play';
  }
};

window.onload = () => tikTakToe.init();

