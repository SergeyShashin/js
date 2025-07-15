'use strict';

let attempts;
let numbers;

start();

function reset() {
  attempts = 0;
  numbers = [];
  while (numbers.length < 4) {
    let randomNum = Math.floor(Math.random() * 10);
    if (randomNum === 0 && numbers.length === 0) {
      continue;
    }
    numbers.includes(randomNum) ? '' : numbers.push(randomNum);
  }
}

function start() {
  reset();
  console.log(numbers);
  while (true) {
    let userNum = Number(prompt('Какое 4-х значное число загадал компьютер? Для выхода -1.'));
    if (userNum === -1) {
      return sayGoodbye();
    }
    if (userNum > 999 && userNum < 10000) {
      let result = checkNumber(userNum);
      attempts++;
      if (result[0] === 4) {
        if (confirm(`Отгадали c ${attempts} попытки. Ещё?`)) {
          return start()
        } else {
          return sayGoodbye();
        }
      } else {
        alert(`Быков ${result[0]}. Коров ${result[1]}.`)
      }
    } else {
      continue
    }
  }
}

function checkNumber(userNum) {
  userNum = String(userNum);
  if (userNum === numbers.join('')) {
    return [4, 0]
  }
  const result = [0, 0];
  for (let i = 0; i < numbers.length; i++) {
    let num = Number(userNum[i]);
    if (num === numbers[i]) {
      console.log(num);
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