'use strict';

let attemps, number;

bullsAndCows();

/**
 * Отгадывание числа
 */
function bullsAndCows() {

  setStartSettings();
  // console.log(attemps);
  console.log(number);

  result(enterNumber());

}

/**
 * Установка игры в начальное положение. Количество попыток 0.
 * Генерация 4-х значного числа для отгадывания
 */
function setStartSettings() {
  attemps = 0;
  number = [];

  for (let i = 0; number.length < 4; i++) {
    let randomNumber = getRandomNumber();
    if (!number.includes(randomNumber)) {
      number.push(randomNumber);
    }
  }
}

/**
 * Генерация произвольного числа от до 9
 * @returns {number} Возвращает произвольное число от 1 до 9
 */
function getRandomNumber() {
  return parseInt(Math.random() * 10);
}

/**
 * Ввод числа пользователем
 * @returns {number} Возвращает 4-х значное число
 */
function enterNumber() {
  while (true) {
    let userNumber = prompt(`Введите 4-х значное число`);
    if (userNumber.length === 4 && Number.isInteger(parseInt(userNumber))) {
      return userNumber;
    }
  }
}

function result(userNumber) {
  attemps++;
  let result = [0, 0];
  let userNumberArr = userNumber.split(',');

  alert(userNumberArr);

  for (let i = 0; i <= userNumber.length; i++) {
    userNumber[i] === number[i] ? result[0]++ : '';
    number.includes(userNumber[i]) ? result[1]++ : '';
  }

  console.log(`Быков ${result[0]}, коров ${result[1]}. Количество попыток ${attemps}`);

}