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
  },
  getMapArr() {
    return this.mapArr
  }

};

const tikTakToe = {
  map,
  phase: null,
  status: null,
  smile1: null,
  smile2: null,
  line1: null,
  line2: null,
  counterCLick: null,
  init() {
    this.smile1 = '(^_^)';
    this.smile2 = '(*_*)';
    this.line1 = '(^_^)(^_^)(^_^)';
    this.line2 = '(*_*)(*_*)(*_*)';
    this.phase = this.smile1;
    this.counterCLick = 0;
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
    this.counterCLick++;
    eTarget.textContent = this.phase;
    this.map.setCoordinates(eTarget.dataset, this.phase);

    if (this.counterCLick > 3) {
      this.check();
    }

    if (this.counterCLick === 9) {
      this.status = 'stop';
      return alert('3 одинаковых смайлика не собрали.');
    }

    this.togglePhase();
  },
  togglePhase() {
    this.phase = this.phase === this.smile1 ? this.smile2 : this.smile1;
  },
  statusPlay() {
    return this.status === 'play';
  },
  check() {
    let mapArr = this.map.getMapArr();

    for (let i = 0; i < 3; i++) {
      let arrLine = mapArr[i].join('');
      let arrCol = '';
      let arrDiagonal1 = '';
      let arrDiagonal2 = '';

      for (let j = 0, z = 2; j < 3; j++ , z--) {
        arrCol += mapArr[j][i];
        arrDiagonal1 += mapArr[j][j];
        arrDiagonal2 += mapArr[j][z];
      }

      if (this.checkLine([arrLine, arrCol, arrDiagonal1, arrDiagonal2])) {
        this.status = 'stop';
        return alert(`${this.phase} собрали 3 смайлика подряд.`);
      };
    }
  },
  checkLine(lines) {
    for (let line of lines) {
      if (line === this.line1 || line == this.line2) {
        return true
      }
    }
  }
};

window.onload = () => tikTakToe.init();

