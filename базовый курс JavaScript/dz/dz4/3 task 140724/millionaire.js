'use strict';

/*
3**. На базе игры (приняв за пример), созданной на уроке, реализовать игру «Кто хочет стать миллионером?».
Т.е. у вас должен быть главный объект содержащий всю логику игры, который будет иметь методы, например
метод run, возможно метод init и т.д.
В игре должны быть заранее подготовлены список вопросов и ответов (как минимум 5 вопросов).
Игра должна приветствовать пользователя, после чего задавать вопросы пользователю и предлагать варианты
ответов в виде теста, например:
Сколько букв в слове "привет":
a. Пять.
b. Шесть.
c. Семь.
d. Куда я попал?
Проверять правильный вариант выбрал пользователь или нет, необходимо вести счет.
По окончании игры, когда было задано 5 вопросов, вы должны сообщить пользователю его счет и предложить
сыграть снова.
Также должна быть возможность выхода из игры заранее, если пользователю надоело играть.
*/

const game = {
  count: 0,
  correctAnswers: 0,
  questionsAndAnswers: [
    {
      numberQuestion: 1,
      textQuestion: 'Это первый вопрос?',
      answer: 'да'
    },
    {
      numberQuestion: 2,
      textQuestion: 'Это второй вопрос?',
      answer: 'да'
    },
    {
      numberQuestion: 3,
      textQuestion: 'Это третий вопрос?',
      answer: 'да'
    },
    {
      numberQuestion: 4,
      textQuestion: 'Это четвёртый вопрос?',
      answer: 'да'
    },
    {
      numberQuestion: 5,
      textQuestion: 'Это пятый вопрос?',
      answer: 'да'
    },
  ],
  
  run() {
    alert('Добро пожаловать). Поотвечаем на вопросы?');

    for (const question of this.questionsAndAnswers) {
      let userAnswer = prompt(`${question.textQuestion} Варианты ответов: да/нет. Для выхода 'e'`);
      if (userAnswer === 'е') {
        break;
      }

      if (userAnswer === question.answer) {
        this.count++;
        this.correctAnswers++;
        alert('Верно)');
      } else {
        this.count++;
        alert('В следующий раз ответите верно)');
      }

    };

    this.sayFinalPhrase();


    if (confirm('Ещё раз?')) {
      this.reset();
      this.run();
    }

  },

  reset() {
    this.correctAnswers = 0;
    this.count = 0;
  },

  sayFinalPhrase() {
    alert(`Спасибо за игру. Вы ответили верно на ${this.correctAnswers} вопросов из ${this.count}.`);
  }
}

game.run();
