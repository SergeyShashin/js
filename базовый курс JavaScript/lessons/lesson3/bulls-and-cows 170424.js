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
    
    let guessNumber = Number(prompt('Введите 4-х значное число или -1 для выхода.'));
    
    if (guessNumber === -1) {
      return alert('Всех благ)');
    }
    attemps++;
    
    if (guessNumber === randomNumber) {
      sayWin();
      return
    }
    
    console.log(randomNumber);
  }
}

function sayWin() {
  if (confirm(`Угадали c ${attemps} попытки. Ещё?`)) {
    resetGame();
  } else {
    return
  };
}

