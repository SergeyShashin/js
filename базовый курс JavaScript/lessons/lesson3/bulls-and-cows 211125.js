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

  while (confirm('Пробуем?')) {
    let userNumber = prompt('Какое 4-х значное число попробуем сравнить с тем, что задумал комп?');

    if (!isValid(userNumber)) {
      alert('Ожидается ввод 4-х значного числа.');
      continue;
    }

    attempts++;

    let result = check(userNumber);
    if (result[0] === 4) {
      alert(`Получилось с ${attempts} попытки.`);
      return confirm('Ещё?') ? startGame() : alert('Спаасибо) До встреч!');
    }

    alert(`Быков ${result[0]}. Коров ${result[1]}`);
  }
}

function isValid(userNumber) {
  return userNumber.length === 4 && Number.isInteger(Number(userNumber)) && !/ /.test(userNumber);
}

function check(userNumber) {
  let result = [0, 0];

  if (userNumber === number.join('')) {
    return [4, 0];
  }

  for (const key in number) {
    if (number[key] === Number(userNumber[key])) {
      result[0]++;
    } else if (number.includes(Number(userNumber[key]))) {
      result[1]++;
    }
  }

  return result
}