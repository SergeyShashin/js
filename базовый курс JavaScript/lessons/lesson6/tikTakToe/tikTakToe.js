'use strict';

/**
 * @type {object} Карта
 */
const map = {
  gameElement: null,
  gridElements: {},
  init() {
    this.gameElement = document.getElementById('game');
    for (let row = 0; row < 3; row++) {
      let tr = document.createElement('tr');
      this.gameElement.appendChild(tr);
      for (let col = 0; col < 3; col++) {
        let td = document.createElement('td');
        td.setAttribute('data-coordiantes', `x${col}_y${row}`);
        // td.dataset.x = col
        // td.dataset.y = row;
        this.gridElements[`x${col}_y${row}`] = td;
        tr.appendChild(td);
      }
    }
  },

  getGameElement() {
    return this.gameElement;
  },
  getGridElements() {
    return this.gridElements;
  },
  /**
   * Ставит пустой символ в td
   */
  reset() {
    for (let val in this.gridElements) {
      this.gridElements[val].textContent = '';
    }
  }
}

/**
 * @type {object} Игра "Крестики нолики".
 */
const tikTakToe = {
  map,
  gamePhase: null,
  numberOfmoves: null,
  init() {
    console.log('Старт игры "Крестики нолики"');
    this.gamePhase = 'X';
    this.numberOfmoves = 0;
    this.map.init();
    this.map.reset();
    this.setEventHandler();
  },
  setEventHandler() {
    this.map.getGameElement().addEventListener('click', (event) => this.clickHandler(event));
  },
  clickHandler(event) {
    if (event.target.tagName !== 'TD') {
      return
    }
    this.setInCellXor0(event.target);
    this.numberOfmoves++;
    if (this.isWin()) {
      this.reset();
      confirm(`Победили ${this.gamePhase}. Ещё?`) ? this.map.reset() : window.close();
      return
    }
    if (this.isDraw()) {
      this.reset();
      confirm(`Победила дружба. Ещё?`) ? this.map.reset() : window.close();
      return
    }
    this.changeGamePhase();
  },
  setInCellXor0(td) {
    if (td.textContent === '') {
      td.textContent = this.gamePhase;
    }
  },
  changeGamePhase() {
    this.gamePhase = this.gamePhase === 'X' ? '0' : 'X';
  },
  isWin() {
    let elements = this.map.getGridElements();
    return this.islineWin(elements['x0_y0'].textContent, elements['x1_y0'].textContent, elements['x2_y0'].textContent) ||
      this.islineWin(elements['x0_y1'].textContent, elements['x1_y1'].textContent, elements['x2_y1'].textContent) ||
      this.islineWin(elements['x0_y2'].textContent, elements['x1_y2'].textContent, elements['x2_y2'].textContent) ||
      this.islineWin(elements['x0_y0'].textContent, elements['x1_y1'].textContent, elements['x2_y2'].textContent) ||
      this.islineWin(elements['x2_y0'].textContent, elements['x1_y1'].textContent, elements['x0_y2'].textContent) ||
      this.islineWin(elements['x0_y0'].textContent, elements['x0_y1'].textContent, elements['x0_y2'].textContent) ||
      this.islineWin(elements['x1_y0'].textContent, elements['x1_y1'].textContent, elements['x1_y2'].textContent) ||
      this.islineWin(elements['x2_y0'].textContent, elements['x2_y1'].textContent, elements['x2_y2'].textContent);

  },
  islineWin(a, b, c) {
    if (a !== '' || b !== '' || c != '') {
      return a === b && b === c;
    }
  },
  isDraw() {
    return this.numberOfmoves === 9;
  },
  reset() {
    this.numberOfmoves = 0;
  }
};

window.onload = tikTakToe.init();