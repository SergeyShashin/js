'use strict';


let number;
let attemps;
let statusPlay;

reset();
tryGuesNumber();

function reset() {
  number = Math.floor(Math.random() * 100);
  attemps = 0;
  statusPlay = true;
}

function tryGuesNumber() {
  if (!statusPlay) {
    return;
  }

  let numberUser = Number(prompt('Число от 0 до 100.'));

  if (!(numberUser >= 0) || !(numberUser < 100)) {
    tryGuesNumber();
  }

  attemps++;

  if (numberUser === number) {
    alert(`Отгадали с ${attemps} попытки.`)
    if (confirm('Ещё?')) {
      reset();
      tryGuesNumber();
    } else {
      alert('Всех благ)');
      statusPlay = false;
      return
    }
  } else if (numberUser < number) {
    alert('Рандомное Число больше.');
  } else {
    alert('Рандомное число меньше.');
  }

  tryGuesNumber();
}

