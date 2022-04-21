'use strict';

guessTheNumber();

/**
 * Отгадывание, введенного числа
 */
function guessTheNumber() {
  let randomNumber = Math.round(Math.random() * 101);
  console.log(`Сегенерированное число ${randomNumber}`);

  let userInputNumber = inputNumber();
  console.log(`Наконец-то у нас есть число ${userInputNumber} для определения совпадения `);

  while (randomNumber !== userInputNumber) {
    if (randomNumber < userInputNumber) {
      console.log(`${userInputNumber} больше загаданного`);
    } else {
      console.log(`${userInputNumber} меньше загаданного`);
    }
    userInputNumber = inputNumber();
  }

  alert('Отгадали!');

  confirm('Ещё разок?') ? guessTheNumber() : alert('До встречи!')
}

/**
 * Возвращает число, введённое пользователем
 * @return {number}
 */
function inputNumber() {
  let userInputNumber = +prompt('Введите число от 0 до 100', 50);
  while (!validationOfNumber(userInputNumber)) {
    console.log('Ввели не то, что просили');
    userInputNumber = inputNumber();
  }
  return userInputNumber
}

/**
 * Возвращает true, если number - число от 0 до 100. False, если нет.
 * @param {number} number 
 * @return {boolean} 
 */
function validationOfNumber(number) {
  return (number >= 0 && number <= 100) && Number.isInteger(number) && number != ''
}