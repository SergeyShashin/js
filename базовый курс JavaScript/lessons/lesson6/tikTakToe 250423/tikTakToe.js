'use strict';

/**
 * Игра крестики и нолики
 * @type {Object} Игра крестики и нолики
 */
const tikTakToe = {
  gameElement: null,
  field: null,
  phase: 'X',
  status: null,
  counterClick: null,

  /**
   * Инициализация игры.
   */
  init() {
    this.gameElement = document.getElementById('tikTakToe');
    this.gameElement.innerHTML = '';
    this.counterClick = 0;
    this.field = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.status = 'playing';
    this.renderMap();
    this.setHandlers();
  },

  /**
   * Создает и отображает игровое поле.
   */
  renderMap() {
    for (let row = 0; row < 3; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < 3; col++) {
        let td = document.createElement('td');
        td.dataset.row = row;
        td.dataset.col = col;
        tr.appendChild(td);
      }
      this.gameElement.appendChild(tr);
    }
  },

  /**
   * Устанавливает слушателей событий
   */
  setHandlers() {
    this.gameElement.addEventListener('click', (event) => this.clickHandler(event));
  },

  /**
   * Обрабатывает клики по игровому  полю
   * @param {Event} event Событие клика
   */
  clickHandler(event) {
    let target = event.target;

    if (target.tagName !== 'TD' || target.textContent.length > 0 || this.status === 'stop') {
      return
    }

    target.textContent = this.phase;
    this.counterClick++;


    if (this.counterClick === 9) {
      alert('Дружба');
    }

    this.field[target.dataset.row][target.dataset.col] = this.phase;

    if (this.isTheareWiner()) {
      this.status = 'stop';
      alert(`${this.phase} победили.`);
      if (confirm('Ещё?')) {
        this.init();
      } else {
        alert('До следующей встречи!');
      }
    }

    this.togglePhase();


  },

  /**
   * Переключение между X и 0
   */
  togglePhase() {
    this.phase === 'X' ? this.phase = '0' : this.phase = 'X';
  },

  /**
   * Определяет есть-ли победитель
   * @returns {boolean} true - победитель есть, false-победителя нет
   */
  isTheareWiner() {
    return this.islineWin(this.field[0][0] + this.field[0][1] + this.field[0][2]) ||
      this.islineWin(this.field[1][0] + this.field[1][1] + this.field[1][2]) ||
      this.islineWin(this.field[2][0] + this.field[2][1] + this.field[2][2]) ||
      this.islineWin(this.field[0][0] + this.field[1][1] + this.field[2][2]) ||
      this.islineWin(this.field[0][2] + this.field[1][1] + this.field[2][0]) ||
      this.islineWin(this.field[0][0] + this.field[1][0] + this.field[2][0]) ||
      this.islineWin(this.field[0][1] + this.field[1][1] + this.field[2][1]) ||
      this.islineWin(this.field[0][2] + this.field[1][2] + this.field[2][2])
  },

  /**
   * Определяет идентичность строки XXX или 000
   * @param {string} str Строка из трех символов
   * @returns {boolean} true соответсвие есть, false соответсвия нет  
   */
  islineWin(str) {
    return str === 'XXX' || str === '000';
  }

}

window.onload = tikTakToe.init();