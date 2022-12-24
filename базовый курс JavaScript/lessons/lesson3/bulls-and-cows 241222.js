'use strict';

gameBullsAndCows();

/**
 * Игра "Быки и коровы"
 */
function gameBullsAndCows() {

  let numbers;
  let attempts;
  let result;

  resetGame();

  while (result[0] !== 4) {
    let guess = prompt('Введите 4-х значное число');
    attempts++
    if (!validation(guess)) {
      continue;
    }

    if (numbers === guess) {
      result[0] = 4;
      console.log(`Отгадали с ${attempts} попытки`);
      return;

    }

    checkGuess(guess);

    console.log(`Быки: ${result[0]} Коровы: ${result[1]} Попытки ${attempts}`);

  }

  function checkGuess(guess) {
    result[0] = 0;
    result[1] = 0;
    for (let i = 0; i < guess.length; i++) {
      if (numbers[i] === guess[i]) {
        result[0]++;
      } else if (numbers.includes(guess[i])) {
        result[1]++;
      }
    }
  }

  /**
   * Проверяет ввод 4 цифр
   * @param {string} guess 
   * @returns {boolean} Возвращает правду если, ввели 4 цифры. 
   */
  function validation(guess) {
    return /^[\d]{4}$/.test(guess);
  }


  /**
   * Устанавливает игру в начальное положение.
   */
  function resetGame() {
    attempts = 0;
    numbers = '';
    result = [0, 0];

    while (numbers.length < 4) {
      let numberRandom = Math.floor(Math.random() * 10);
      if (!numbers.includes(numberRandom)) {
        numbers += numberRandom;
      }
    }
  }

}

while (confirm('Играем?')) {
  gameBullsAndCows();
}

console.log('До встречи!');