'use strict';

let attempts;
let number;

start();

function reset() {
  attempts = 0;
  number = Math.floor(Math.random() * 100);
}

function tryGuessNumber() {
  let userNumber = Number(prompt('Число от 0 до 100? Для выхода -1', 50));

  if (userNumber === -1) {
    return sayGoodBy();
  }

  if (userNumber > 0 && userNumber < 100) {
    attempts++;
  }

  if (userNumber === number) {
    if (sayFinalPhrase()) {
      reset();
    } else {
      return sayGoodBy()
    }
  } else if (userNumber < number) {
    alert('Может быть число больше.');
  } else if (userNumber > number) {
    alert('Можно число меньше.');
  }

  tryGuessNumber();

}

function sayGoodBy() {
  alert('Всех благ)');
}

function sayFinalPhrase() {
  return confirm(`Отгадано с ${attempts} попытки. Ещё?`);
}

function start() {
  reset();
  tryGuessNumber();
}