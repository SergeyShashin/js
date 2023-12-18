'use strict';

console.log('Быки и коровы.');

let attempts;
let number;
let userNumber;
let statusGame;
let result;

game();

/**
 * Установка начальных параметров игры
 */
function resetGame() {
  attempts = 0;
  number = getRandomNumber();
  userNumber = null;
  statusGame = 'play';
  result = [0, 0];
}

/**
 * Старт игры
 */
function game() {
  resetGame();
  console.log(number);

  while (statusGame === 'play') {
    attempts++;

    let userNumber = getUserNumber();
    console.log('Номер пользователя ' + userNumber);
    checkNumber(userNumber);

    if (result[0] === 4) {
      statusGame === 'stop';
      console.log(`Поздравляем. Вы отгадали число ${number.join('')} с ${attempts} попытки.`);
      if (confirm('Ещё?')) {
        console.clear();
        game();
      } else {
        return console.log('До встречи!');
      }
    } else {
      console.log(`Быков ${result[0]}. Коров ${result[1]}.`)
    }
  }

}

/**
 * Генерирует массив с 4 числами
 * @returns {Array} number
 */
function getRandomNumber() {
  let number = [];

  while (number.length < 4) {
    let partNumber = Math.floor(Math.random() * 10);
    if (!number.includes(partNumber)) {
      number.push(partNumber);
    }
  }

  return number;
}

/**Ввод числа пользователем*/
function getUserNumber() {
  userNumber = prompt('Введите, пожалуйста, 4-х значное число');
  if (!validation(userNumber)) {
    console.log('Это не четырёхзначное число.');
    getUserNumber();
  }
  return userNumber
}

/**
 * Проверка ввода числа
 * @param {string} userNumber 
 * @returns 
 */
function validation(userNumber) {
  return userNumber.length === 4 && Number.isInteger(Number(userNumber));
}

/**
 * Определение количества быков и коров
 * @param {string} userNumber 
 */
function checkNumber(userNumber) {
  result = [0, 0];

  for (let i = 0; i < number.length; i++) {
    if (number[i] === Number(userNumber[i])) {
      result[0]++;
    } else if (number.includes(Number(userNumber[i]))) {
      result[1]++;
    }
  }
}