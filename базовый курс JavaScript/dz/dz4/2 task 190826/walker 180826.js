'use strict';

/*
Для игры, реализованной на уроке (бродилка), добавить возможность ходить по диагонали
цифрами 1, 3, 7, 9
Также необходимо сделать так, чтобы пользователь не мог совершить шаг в стенку, т.е. при
направлении в стенку
игрок оставался на том же месте где стоял.
*/

const settings = {
  startPostitionX: 5,
  startPostitionY: 5,
  colsCount: 10,
  rowsCount: 10,
  signPlayer: ':) ',
  wordForExit: 'выйти'
};

const player = {
  x: null,
  y: null,
  init(startPostitionX, startPostitionY) {
    this.x = startPostitionX;
    this.y = startPostitionY;
  },
  getNextStep(step) {
    let nextStep = {
      x: this.x,
      y: this.y,
    }
    switch (step) {
      case '4':
        nextStep.x--;
        break;
      case '6':
        nextStep.x++;
        break;
      case '2':
        nextStep.y++;
        break;
      case '8':
        nextStep.y--;
        break;
      case '1':
        nextStep.x--;
        nextStep.y++;
        break;
      case '7':
        nextStep.x--;
        nextStep.y--;
        break;
      case '9':
        nextStep.x++;
        nextStep.y--;
        break;
      case '3':
        nextStep.x++;
        nextStep.y++;
        break;
    }
    return nextStep
  },
  move(nextStep) {
    this.x = nextStep.x;
    this.y = nextStep.y;
  }
};

const walker = {
  settings,
  player,
  map: null,
  run() {
    this.player.init(this.settings.startPostitionX, this.settings.startPostitionX);
    this.render();
    while (true) {
      let step = this.getStep();
      if (step === this.settings.wordForExit) {
        return alert('Спасибки) До встречи)');
      }
      let nextStep = this.player.getNextStep(step);
      if (this.canStep(nextStep)) {
        this.player.move(nextStep);
      }

      this.render();
    }

  },
  render() {
    this.map = '';
    console.clear();
    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {
        row === this.player.y && col === this.player.x ? this.map += this.settings.signPlayer : this.map += '+  ';
      }
      this.map += '\n';
    }
    console.log(this.map);
  },
  getStep() {
    while (true) {
      const availableStep = ['4', '2', '6', '8', '1', '7', '9', '3', this.settings.wordForExit];
      let step = prompt(`Куда шагнём? Возможности [${availableStep.join(', ')}]`);
      if (availableStep.includes(step)) {
        return step;
      }
    }
  },
  canStep(nextStep) {
    return nextStep.x > -1 && nextStep.x < this.settings.colsCount &&
      nextStep.y > -1 && nextStep.y < this.settings.rowsCount
  }
};

window.onload = () => walker.run();