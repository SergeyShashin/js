'use strict';

let attempts;
let number;

resetGame();
tryGuessNumber();


/**
 * Устанавливает игру в стартовое состояние
 */
function resetGame() {
  attempts = 0;
  number = Math.round(Math.random() * 100);
}


/**
 * Отгадывание number
 */
function tryGuessNumber() {
  let userNumber = Number(prompt('Напечатайте, пожалуйста, число от 0 до 100.'));

  if (!Number.isInteger(userNumber)) {
    tryGuessNumber();
  }

  attempts++;


  if (userNumber === number) {
    if (confirm(`Отгадали с ${attempts} попытки.) Ещё разок?`)) {
      resetGame();
      tryGuessNumber();
    } else {
      alert('Спасибо. До встречи)');
      return
    }
  } else if (userNumber > number) {
    alert('Меньше.');
  } else {
    alert('Больше.');
  }

  tryGuessNumber();
}