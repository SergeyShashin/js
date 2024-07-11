'use strict';

let number;
let attemps;

resetGame();
tryGuesNumber();

function resetGame() {
  number = [];
  attemps = 0;

  while (number.length < 4) {
    let randomNum = Math.floor(Math.random() * 10);
    number.includes(randomNum) ? '' : number.push(randomNum);
  }
}

function tryGuesNumber() {
  let result = [0, 0];

  while (true) {
    let userNumStr = prompt('Угадываем 4-х значное число.');
    userNum = Number(userNumStr);


    if (!Number.isInteger(userNum)) {
      console.log('Напечатать нужно 4-х значное число.')
      continue
    }

    for (let val of userNumStr) {

    }

  }

}