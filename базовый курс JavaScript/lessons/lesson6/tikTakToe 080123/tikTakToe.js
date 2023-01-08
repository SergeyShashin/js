'use strict';

const tikTakToe = {
  statusGame: null,
  phase: null,
  mapValue: null,
  gameElement: null,

  init() {
    this.statusGame = 'play';
    this.phase = 'X';
    this.mapValue = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.gameElement = document.getElementById('tikTakToe');
    console.log(this.gameElement);

    this.render();
    this.setHandlerClick();

  },

  render() {
    for (let row = 0; row < 3; row++) {
      let tr = document.createElement('tr');
      this.gameElement.appendChild(tr);
      for (let col = 0; col < 3; col++) {
        let td = document.createElement('td');
        td.dataset.x = row;
        td.dataset.y = col;
        tr.appendChild(td);
      }
    }
  },

  setHandlerClick() {
    this.gameElement.addEventListener('click', (event) => this.handlerClick(event));
  },

  handlerClick(event) {
    if (!this.isClickCell(event) || !this.isCellEmpty(event) || this.statusGameStop()) {
      return;
    }
    event.target.textContent = this.phase;
    this.mapValue[event.target.dataset.x][event.target.dataset.y] = this.phase;
    this.hasWon();
    this.toglePhase();
  },

  isClickCell(event) {
    return event.target.tagName === 'TD';
  },

  statusGameStop() {
    return this.statusGame === 'stop';
  },

  toglePhase() {
    return this.phase === 'X' ? this.phase = 'O' : this.phase = 'X';
  },

  isCellEmpty(event) {
    return event.target.textContent === '';
  },

  hasWon(){
    
  }

}


window.onload = tikTakToe.init();