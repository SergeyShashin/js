'use strict';

let attemps, number;

bullsAndCows();

/**
 * Отгадывание числа
 */
function bullsAndCows() {

  setStartSettings();
  alert(`Загаданный номер ${number}`);

  while (true) {
    let result = [0, 0], userNumber = enterNumber().split('');
    console.log(`Число пользователя ${typeof(userNumber[0])}`);
    console.log(`Число пользователя ${typeof(number[0])}`);

    for (let i = 0; i < userNumber.length; i++) {
      console.log(`Предполагаемый номер ${userNumber}`);

      if (userNumber[i] === number[i]) {
        console.log('Как-то зашли');
        console.log(`Загаданное число ${number[i]}`);
        console.log(`Число пользователя ${userNumber[i]}`);
        result[0]++;
      } else if (number.includes(userNumber[i])) {
        result[1]++;
      }
    }

    attemps++;

    console.log(`Быков ${result[0]}, коров ${result[1]}. Количество попыток ${attemps}`);
    if (result[0] === 4) {
      alert('Поздравляем. Вы отгадали!')
    }

  }


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

