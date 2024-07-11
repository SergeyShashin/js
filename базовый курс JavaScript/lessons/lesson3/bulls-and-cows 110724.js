'use strict';

let number;
let attemps;

startGame();

function startGame() {
  resetGame();
  console.log(number);

  tryGuesNumber();
}

function resetGame() {
  number = [];
  attemps = 0;

  while (number.length < 4) {
    let randomNum = Math.floor(Math.random() * 10);
    number.includes(randomNum) ? '' : number.push(randomNum);
  }
}


function tryGuesNumber() {

  while (true) {
    let userNumStr = prompt('Угадываем 4-х значное число.');
    let userNum = Number(userNumStr);
    let result = [0, 0];


    if (!Number.isInteger(userNum)) {
      console.log('Напечатать нужно 4-х значное число.')
      continue
    }

    number.map((num, idx) => {

      if (num === Number(userNumStr[idx])) {
        result[0]++;
      } else if (number.includes(Number(userNumStr[idx]))) {
        result[1]++;
      }
    });

    if (result[0] === 4) {
      if (confirm('Число нашли. Ещё?)')) {
        startGame();
      } else {
        return
      }
    } else {
      console.log(`Быков ${result[0]}. Коров ${result[1]}`);
    }

  }

}