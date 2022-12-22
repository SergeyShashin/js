'use strict';

guessTheNumber();

/**
 * Отгадывание числа
 */
function guessTheNumber() {
  let random = Math.floor(Math.random() * 100);
  let number;

  while (true) {
    number = Number(prompt('Введите число от 0 до 100. Для выхода введите -1'));

    if (number === -1) {
      return console.log('До свидания');
    }

    if (random === number) {
      return console.log('Ура. Число отгадали');
    } else if (random < number) {
      console.log('Попробуйте число меньше');
    } else {
      console.log('Попробуйте число больше');
    }
  }
}

while (confirm('Играем?')) {
  guessTheNumber();
}


