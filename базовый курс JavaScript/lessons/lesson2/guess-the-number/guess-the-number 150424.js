'use strict';

let randomNumber;
let attemps;

resetGame();
tryGuesNumber();

/**
 * Устанавливает игру в начальное положение
 */
function resetGame() {
  randomNumber = Math.floor(Math.random() * 100);
  attemps = 0;
}

/**
 * Спрашивает число у пользователя. Проверяет на совпадение. Выдаёт результат. 
 */
function tryGuesNumber() {

  let tryNumber = Number(prompt('Напечатайте число от 0 до 100. Для выхода -1', 50));

  if (tryNumber < 0 || tryNumber > 100) {
    tryGuesNumber();
  }
  
  if (tryNumber === -1) {
    return
  }

  attemps++;

  if (tryNumber === randomNumber) {
    if (confirm(`Отгадали) с ${attemps} попытки. Ещё?`)) {
      resetGame();
      tryGuesNumber();
    } else {
      alert('Всех благ)');
    }
  } else if (tryNumber < randomNumber) {
    alert('Попробуйте число больше.');
    tryGuesNumber();
  } else {
    alert('Попробуйте число меньше.')
    tryGuesNumber();
  }
}
