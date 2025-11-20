'use strict';
let attempts;
let number;

startGame();

function startGame() {
  reset();
  attemptsGuessNumber();
}

function reset() {
  attempts = 0;
  number = [];

  while (number.length < 4) {
    let randomNum = Math.floor(Math.random() * 10);
    number.includes(randomNum) ? '' : number.push(randomNum);
  }

  console.log(number);
}

function attemptsGuessNumber() {
  let bulls = [];

  while (confirm('Пробуем?')) {
    let userNumber = prompt('Какое 4-х значное число попробуем сравнить с тем, что задумал комп?');

    if (!isValid(userNumber)) {
      alert('Ожидается ввод 4-х значного числа.');
      continue;
    }

    console.log(userNumber);

  }
}

function isValid(userNumber) {
  return userNumber.length === 4 && Number.isInteger(Number(userNumber))&&!/ /.test(userNumber);
}