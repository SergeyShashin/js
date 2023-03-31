'use strict';

let randomNumber, attempt;
resetGame();
tryGuesNumber();

while (confirm('Ещё?')) {
  resetGame();
  tryGuesNumber();
}


/**
 * Устанавливает стартовые значения.
 */
function resetGame() {
  randomNumber = Math.floor(Math.random() * 100);
  attempt = 0;
}

/**
 * Ввод числа пользователем.
 * @returns {number} Число, которое ввёл пользователь.
 */
function inputNumber() {
  return Number(prompt('Введите целое число от 0 до 100.'));
}

/**
 * Ведете диалог с пользователем для отгадывания загаданного числа.
 * 
 */
function tryGuesNumber() {
  let userNumber = inputNumber();

  while (userNumber < 0 || userNumber > 100 || !Number.isInteger(userNumber) || Number.isNaN()) {
    userNumber = inputNumber();
  }

  if (randomNumber === userNumber) {
    console.log(`Отгадали c ${attempt} попытки.`);
    return
  } else if (randomNumber > userNumber) {
    console.log(`Попробуйте число больше ${userNumber}.`);
    attempt++;
  } else if (randomNumber < userNumber) {
    console.log(`Попробуйте число меньше ${userNumber}.`);
    attempt++;
  }

  tryGuesNumber();
}


