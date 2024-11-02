'use strict';

let attempts, number, result;

reset();
game();

/**
 * Инициализация стартовых параметров игры
 */
function reset() {
  attempts = 0;
  number = [];
  result = [0, 0];

  while (number.length < 4) {
    let randomNumber = Math.round(Math.random() * 9);
    number.includes(randomNumber) ? '' : number.push(randomNumber);
  }
}

/**
 * Отгадывание числа
 */
function game() {
  while (result[0] !== 4) {
    let userNumber = prompt('Загадано целое четырёхзначное число. Ваш вариант или "-1" для выхода');

    if (userNumber == '-1') {
      return
    }

    if (!validation(userNumber)) {
      continue
    }

    attempts++;

    result = compareNumbers(userNumber);

    if (result[0] === 4) {
      console.log(`Отгадали с ${attempts} попытки`);
      break
    } else {
      console.log(`Быков ${result[0]}. Коров ${result[1]}`);
    }
  }

  if (confirm('Ещё разок?')) {
    reset();
    game();
  } else {
    return 'Спасбио за хорошую игру. До встречи)'
  }

}

/**
 * Проверяет ввод целого четырёхзначного числа
 * @param {string} userNumber - число пользователя
 * @returns {boolean}
 */
function validation(userNumber) {
  return Number.isInteger(Number(userNumber)) && userNumber.length === 4;
}

/**
 * Сравнивает загаданное число с числом пользователя
 * @param {string} userNumber 
 * @returns {array} количество быков и коров
 */
function compareNumbers(userNumber) {
  let bulls = 0;
  let cows = 0;
  let userNumberArr = userNumber.split('');
  for (let i = 0; i < userNumberArr.length; i++) {
    if (Number(userNumber[i]) === number[i]) {
      bulls++;
    } else if (number.includes(Number(userNumber[i]))) {
      cows++;
    }
  }

  return [bulls, cows];
}

