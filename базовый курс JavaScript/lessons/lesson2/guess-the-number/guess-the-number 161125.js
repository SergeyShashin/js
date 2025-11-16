'use strict';

let attempts;
let randomNumber;

reset();
tryGuessNumber();

function reset() {
  attempts = 0;
  randomNumber = Math.floor(Math.random() * 101);
}

function tryGuessNumber() {
  let userNumber = Number(prompt('Можете напечатать число от 0 до 100', 50));

  if (userNumber < 0 || userNumber > 100) {
    alert(`Напечатали ${userNumber}, а нужно было число от 0 до 100.`);
    tryGuessNumber();
  }
  attempts++;

  if (userNumber < randomNumber) {
    outputMsgForUser('Можно попробовать чило больше.');
  } else if (userNumber > randomNumber) {
    outputMsgForUser('Можно попробовать чило меньше.');
  } else {
    if (confirm(`Числа совпали!) Количество попыток ${attempts}. Ещё разок?`)) {
      reset();
    } else {
      return outputMsgForUser('До встречи!)');
    }
  }

  tryGuessNumber();
}

function outputMsgForUser(msg) {
  alert(msg);
}

