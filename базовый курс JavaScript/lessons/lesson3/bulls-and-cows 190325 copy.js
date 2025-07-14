'use strict';

let attempts, randomNumber;

bullsAndCows();

function bullsAndCows() {
  resetGame();
  console.log(randomNumber);
  while (true) {
    let userNumber = '';
    while (!isValid(userNumber)) {
      userNumber = prompt('Можете напечатать 4-х значное положительное число без повторений.');
    }
    attempts++;
    if (userNumber === randomNumber.join('')) {
      if (confirm(`Определили загаданное число с ${attempts} попытки. Ещё?`)) {
        resetGame();
        bullsAndCows();
      };
      return
    }
    let counterBullsAndCows = compareNumbers(userNumber);
    alert(`Быков ${counterBullsAndCows[0]}. Коров ${counterBullsAndCows[1]}.`);
  }
}

function compareNumbers(userNumber) {
  let res = [0, 0];
  randomNumber.map((el, idx) => {
    if (el === Number(userNumber[idx])) {
      res[0]++;
    } else if (randomNumber.includes(Number(userNumber[idx]))) {
      res[1]++;
    }
  }
  );
  return res
}

function isValid(userNumber) {
  let numberFromUserNumber = Number(userNumber);
  return userNumber.length === 4 && Number.isInteger(numberFromUserNumber) && numberFromUserNumber > 0
}

function resetGame() {
  attempts = 0;
  randomNumber = getRandomNumber();
}

function getRandomNumber() {
  let result = [];
  while (result.length < 4) {
    let randomNumber = Math.floor(Math.random() * 10);
    result.includes(randomNumber) ? '' : result.push(randomNumber);
  }
  return result;
}