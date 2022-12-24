'use strict';

let attempts, number;

bullsAndCows();

/**
 * Отгадывание числа
 */
function bullsAndCows() {

  setStartSettings();


  while (true) {    
    let result = [0, 0], userNumber = enterNumber().split('');

    for (let i = 0; i < userNumber.length; i++) {

      if (parseInt(userNumber[i]) === number[i]) {
        result[0]++;
      } else if (number.includes(parseInt(userNumber[i]))) {
        result[1]++;
      }
    }

    attempts++;

    alert(`Быков ${result[0]}, коров ${result[1]}. Количество попыток ${attempts}`);
    console.log(`Предположение ${userNumber}`);
    console.log(`Быков ${result[0]}, коров ${result[1]}. Количество попыток ${attempts}`);

    if (result[0] === 4) {
      alert('Поздравляем. Вы отгадали!');
      confirm('Ещё?') ? bullsAndCows() : console.log('До свидания)'); return;
    }

  }

}

/**
 * Установка игры в начальное положение. Количество попыток 0.
 * Генерация 4-х значного числа для отгадывания
 */
function setStartSettings() {
  attempts = 0;
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

