'use strict';

let randomNumber;
let attemps;

resetGame();
tryGuessNumber();

/**
 * Инициализация начальных параметров
 * @param attemps number количество попыток
 * @param randomNumber number сгенерированное число от 0 до 100
 */
function resetGame() {

  attemps = 0;

  randomNumber = Math.floor(Math.random() * 100);

}


/**
 * Угадывание числа
 * @param tryNumber number предполагаемое число
 */
function tryGuessNumber() {

  let tryNumber = inputNumber();

  if (!Number.isInteger(tryNumber) || tryNumber < 0 || tryNumber > 100) {
    console.log('Нужно ввести число от 0 до 100');
    return tryGuessNumber();
  }

  attemps++;

  if (tryNumber === randomNumber) {
    console.log(`Число отгадано c ${attemps} попытки`);
    if (confirm('Ёще раз?')) {
      resetGame();
      tryGuessNumber();
    } else {
      console.log('До встречи!');
      return
    }
  } else if (tryNumber < randomNumber) {
    console.log('Нужно число побольше.');
    tryGuessNumber();
  } else {
    console.log('Нужно число поменьше.');
    tryGuessNumber();
  }
}

function inputNumber() {
  return Number(prompt('Ввод числа от 0 до 100'));
}
