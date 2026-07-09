'use strict';

let attempts;
let number;
let msg;

reset();
tryGuesNumber();

/**
 * Сброс на старт
 */
function reset() {
  attempts = 0;
  number = Math.floor(Math.random() * 100);
}

/**
 * Сообщает результат
 * @param string Сообщение
 */
function sayResult(msg) {
  alert(msg);
}

/**
 * Сравнивает данные пользователя с псевдо-рандомным числом и общается с человеком.
 */
function tryGuesNumber() {

  if (!confirm(`Играем? Псевдо-рандомное число ${number}.`)) {
    return alert('До встречи!)');
  }

  let userNumber = parseInt(prompt('Какое число проверяем?', 50));

  attempts++;

  if (number === userNumber) {
    sayResult(`Нашли число с ${attempts} попытки!)`);
    reset();
  } else if (number > userNumber) {
    sayResult(`Можно попробовать число больше!)`);
  } else if (number < userNumber) {
    sayResult(`Можно попробовать число меньше!)`);
  } else {
    sayResult(`Ввели что-то для другой программы.)`);
  }

  tryGuesNumber();
}
