'use strict';

let attempt, randomNumber, userNumber;

startGame();

while (confirm('Ещё?')) {
  startGame();
}

/**
 * Отгадывание числа
 * @returns Сообщение о разгадке числа
 */
function guessNumber() {
  while (true) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < randomNumber.length; i++) {
      let number = Number(userNumber[i]);
      if (randomNumber[i] === number) {
        bulls++;
      } else if (randomNumber.includes(number)) {
        cows++;
      }
    }
    if (bulls === 4) {
      return console.log('Число отгадано');
    }

    console.log(`Число быков = ${bulls}, число коров = ${cows}.`);

    userNumber = inputUserNumber();

  }

}

/**
 * Запускает игру
 */
function startGame() {
  resetGame();
  guessNumber();
}

/**
 * Устанавливает начальные значения игры
 */
function resetGame() {
  attempt = 0;
  randomNumber = getRandomNumber();
  userNumber = inputUserNumber();
}

/**
 * Возвращает массив с 4 произовольными числами от 0 до 10 
 * @returns {Array} Массив с 4 числами.
 */
function getRandomNumber() {
  let number = [];

  while (number.length < 4) {
    let randomNumber = Math.floor(Math.random() * 10);
    if (!number.includes(randomNumber)) {
      number.push(randomNumber)
    }
  }

  return number;
}

/**
 * Ввод числа пользователем
 * @returns {string} Возвращает строку с 4 числами
 */
function inputUserNumber() {
  let userNumber = prompt('Введите 4-х значное число');

  return checkNumber(userNumber) ? userNumber : inputUserNumber()
}

/**
 * Проверяет, что ввели 4 числа
 * @param {string} Строка с 4 числами 
 * @returns 
 */
function checkNumber(number) {
  return number.length === 4 && Number.isInteger(Number(number));
}