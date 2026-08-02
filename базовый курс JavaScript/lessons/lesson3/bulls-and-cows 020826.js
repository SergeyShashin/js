'use strict';

let number;
let attempts;

bullAndCows();

function bullAndCows() {
  reset();

  while (confirm('Находим число, созданное компом?')) {
    let userNumber = prompt('Можно напечатать 4-х значное число без повторений.');

    if (!validation(userNumber)) {
      alert('Ввели что-то отличное от возможного.');
      continue
    }

    attempts++;
    let result = compareUserNumberAndNumber(userNumber, number);
    if (result[0] === 4) {
      if (confirm(`Нашли число c ${attempts} попытки. Ещё?`)) {
        reset();
        continue
      } else {
        return alert('Спасибо) До встречи)');
      };
    }

    alert(`Количество быков ${result[0]}. Количество коров ${result[1]}.`)

  }
}

function reset() {
  attempts = 0;
  number = randomNumber();
}

function randomNumber() {
  number = [];

  while (number.length < 4) {
    let randomNumber = Math.floor(Math.random() * 10);
    if (!number.includes(randomNumber)) {
      number.push(randomNumber);
    }
  }
  console.log(number);

  return number;
}

function validation(userNumber) {
  let flag = true;
  if (userNumber.length !== 4 || new Set(userNumber.split('')).size !== 4) {
    flag = false
  }

  return flag;
}

function compareUserNumberAndNumber(userNumber, number) {
  let result = [0, 0];
  if (userNumber === number) {
    result[0] = 4;
  }

  for (let i = 0; i < userNumber.length; i++) {
    let checkNum = Number(userNumber[i]);
    if (checkNum === number[i]) {
      result[0]++;
    } else if (number.includes(checkNum)) {
      result[1]++;
    }
  }

  return result;
}