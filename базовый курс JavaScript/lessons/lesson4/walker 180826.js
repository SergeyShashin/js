'use strict';

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
  move(nextStep) {
    switch (nextStep) {
      case '4':
        this.x--;
        break;
      case '6':
        this.x++;
        break;
      case '2':
        this.y++;
        break;
      case '8':
        this.y--;
        break;
    }
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
      let nextStep = this.getNextStep();
      if (nextStep === this.settings.wordForExit) {
        return alert('Спасибки) До встречи)');
      }
      // console.log(nextStep);
      this.player.move(nextStep);
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
  getNextStep() {
    while (true) {
      const availableStep = ['4', '2', '6', '8', this.settings.wordForExit];
      let nextStep = prompt(`Куда шагнём? Возможности [${availableStep.join(', ')}]`);
      if (availableStep.includes(nextStep)) {
        return nextStep;
      }
    }
  }
};

window.onload = () => walker.run();