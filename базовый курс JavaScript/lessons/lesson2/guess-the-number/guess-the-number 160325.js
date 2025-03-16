'use strict';

let attemps;
let number;

reset();

function reset() {
  attemps = 0;
  number = Math.floor(Math.random() * 101);
  tryGuessNumber();
}

function tryGuessNumber() {
  if (!confirm('Играем?')) {
    return printWelcome();
  }

  let userNumber = Number(prompt('Может напечатать число от 0 и до 100?'));

  if (!isValidate(userNumber)) {
    tryGuessNumber();
  }
  attemps++;

  if (userNumber === number) {
    if (confirm(`Угадали с ${attemps} попытки). Ещё?`)) {
      return reset();
    } else {
      return printWelcome();
    }
  } else if (userNumber > number) {
    tryLessNumber();
  } else {
    tryMoreNumber();
  }
  tryGuessNumber();
}

function isValidate(number) {
  return number > 0 && number < 101 && Number.isInteger(number)
}

function printWelcome() {
  alert('До встречи)');
}

function tryLessNumber() {
  alert('Можно попробовать число меньше)');
}

function tryMoreNumber() {
  alert('Можно попробовать число больше)');
}