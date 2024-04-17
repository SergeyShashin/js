'use strict';

let randomNumber = [];
let attemps;

resetGame();
guessNumber();

/**
 * Установка игры в начальное положение
 */
function resetGame() {
  attemps = 0;
  let number;

  while (randomNumber.length < 4) {
    number = Math.floor(Math.random() * 10);
    randomNumber.includes(number) ? '' : randomNumber.push(number);
  }
}

/**
 * Принимает число от пользователя. Проверяет наличие быков и коров. Вывводит результат.
*/
function guessNumber() {
  let result = [0, 0];

  while (true) {
    console.log(randomNumber);

    let guessNumber = Number(prompt('Введите 4-х значное число или -1 для выхода.'));

    if (guessNumber === -1) {
      return alert('Всех благ)');
    }

    if (guessNumber < 1000 || guessNumber > 9999 || !Number.isInteger(guessNumber)) {
      continue;
    }

    attemps++;

    if (guessNumber === Number(randomNumber.join(''))) {
      sayWin();
      return
    }

    let arrGuessNumber = String(guessNumber).split('');

    arrGuessNumber.forEach((el, idx) => {
      if (Number(el) === randomNumber[idx]) {
        result[0]++;
      } else if (randomNumber.includes(Number(el))) {
        result[1]++;
      }
    });

    alert(`Быков: ${result[0]}. Коров: ${result[1]}.`);
    result = [0, 0];
  }

}

function sayWin() {
  if (confirm(`Угадали c ${attemps} попытки. Ещё?`)) {
    resetGame();
    guessNumber();
  } else {
    return
  };
}

