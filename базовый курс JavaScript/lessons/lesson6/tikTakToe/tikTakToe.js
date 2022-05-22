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
        td.setAttribute('data-coordiantes', `x${row}_y${col}`);
        // td.dataset.x = row
        // td.dataset.y = col;
        this.gridElements[`x${row}_y${col}`] = td;
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
  init() {
    console.log('Старт игры "Крестики нолики"');
    this.gamePhase = 'X';
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
    this.changeGamePhase();
    this.winCheck();
  },
  setInCellXor0(td) {
    if (td.textContent === '') {
      td.textContent = this.gamePhase;
    }
  },
  changeGamePhase() {
    this.gamePhase = this.gamePhase === 'X' ? '0' : 'X';
  },
  winCheck() {
    console.log(this.map.getGridElements()['x0_y0'].textContent);
    console.log(this.map.getGridElements()['x0_y1'].textContent);
    console.log(this.map.getGridElements()['x0_y2'].textContent);
    console.log(
      this.islineWin(
        this.map.getGridElements()['x0_y0'].textContent,
        this.map.getGridElements()['x0_y1'].textContent,
        this.map.getGridElements()['x0_y2'].textContent)
    );

  },
  islineWin(a, b, c) {
    return a === b && b === c;
  },
};

window.onload = tikTakToe.init();