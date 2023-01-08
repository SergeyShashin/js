'use strict';

const tikTakToe = {
  statusGame: null,
  phase: null,
  mapValue: null,
  gameElement: null,
  moveMade: null,

  init() {
    this.statusGame = 'play';
    this.phase = 'X';
    this.mapValue = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.moveMade = 0;
    this.gameElement = document.getElementById('tikTakToe');

    this.render();
    this.setHandlerClick();

  },

  render() {
    this.gameElement.innerHTML = '';
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
    this.moveMade++;
    event.target.textContent = this.phase;
    this.mapValue[event.target.dataset.x][event.target.dataset.y] = this.phase;

    if (this.hasWon()) {
      this.statusGame = 'stop';
      alert('Победили ' + this.phase);
      this.newGame();
      return;
    } else {
      this.toglePhase();
    }

    if (this.moveMade === 9) {
      alert('Ничья)');
      this.newGame();
    }

  },

  newGame() {
    if (confirm('Ещё разок?')) {
      this.init();
    } else {
      alert('Всех благ!)')
      window.close();
    }
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

  hasWon() {

    return this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
      this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
      this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||
      this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
      this.isLineWon({ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 })

  },

  isLineWon(a, b, c) {
    return this.mapValue[a.x][a.y] === 'X' && this.mapValue[b.x][b.y] === 'X' && this.mapValue[c.x][c.y] === 'X' ||
      this.mapValue[a.x][a.y] === 'O' && this.mapValue[b.x][b.y] === 'O' && this.mapValue[c.x][c.y] === 'O'


  }

}


window.onload = tikTakToe.init();