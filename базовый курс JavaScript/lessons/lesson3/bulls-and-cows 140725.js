'use strict';

let attempts;
let numbers;

start();

function reset() {
  attempts = 0;
  numbers = [];
  while (numbers.length < 4) {
    let randomNum = Math.floor(Math.random() * 10);
    numbers.includes(randomNum) ? '' : numbers.push(randomNum);
  }
}

function start() {
  reset();
  while (true) {
    let userNum = prompt('Какое 4-х значное число загадал компьютер? Для выхода -1.');
    if (userNum === '-1') {
      return sayGoodbye();
    }
    if (userNum > 999 && userNum < 10000) {
      let result = checkNumber(userNum);
      attempts++;
      console.log(numbers);
      if (result[0] === 4) {
        if (confirm(`Отгадали c ${attempts} попытки. Ещё?`)) {
          return start()
        } else {
          return sayGoodbye();
        }
      } else {
        alert(`Быков ${result[0]}. Коров Быков ${result[1]}`)
      }
    } else {
      continue
    }
  }
}

function checkNumber(userNum) {
  if (userNum === numbers.join('')) {
    return [4, 0]
  }
  const result = [0, 0];
  for (let i = 0; i < numbers.length; i++) {
    let num = Number(userNum[0]);
    if (num === numbers[i]) {
      result[0]++;
      continue;
    } else if (numbers.includes(num)) {
      result[1]++;
    }
  }
  return result
}

function sayGoodbye() {
  alert('Всех благ)');
}