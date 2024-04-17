'use strict';

let randomNumber;
let attemps;

resetGame();
guessNumber();

/**
 * Установка игры в начальное положение
 */
function resetGame() {
  attemps = 0;
  randomNumber = Math.floor(Math.random() * (9999 - 1000) + 1000);
}

/**
 * Принимает число от пользователя. Проверяет наличие быков и коров. Вывводит результат.
*/
function guessNumber() {

  while (true) {
    console.log(randomNumber);

    let guessNumber = Number(prompt('Введите 4-х значное число или -1 для выхода.'));

    if (guessNumber === -1) {
      return alert('Всех благ)');
    }

    if (guessNumber < 1000 || guessNumber > 9999 || !Number.isInteger(guessNumber)) {
      console.log('Нужно 4-х значное число.');
      continue;
    }

    attemps++;

    if (guessNumber === randomNumber) {
      sayWin();
      return
    }

    let arGuessNumber= String(guessNumber).split();
    let arrRandomNumber= String(randomNumber).split();

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

