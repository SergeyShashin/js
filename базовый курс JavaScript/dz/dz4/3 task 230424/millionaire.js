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

const questionsAndAnswers = [
  {
    number: 1,
    question: 'Это первый вопрос?',
    correctAnswer: 'да'
  },
  {
    number: 2,
    question: 'Это второй вопрос?',
    correctAnswer: 'да'
  },
  {
    number: 3,
    question: 'Это третий вопрос?',
    correctAnswer: 'да'
  },
  {
    number: 4,
    question: 'Это четвёртый вопрос?',
    correctAnswer: 'да'
  },
  {
    number: 5,
    question: 'Это пятый вопрос?',
    correctAnswer: 'да'
  }

];

const game = {
  questionsAndAnswers,
  counter: null,

  run() {
    this.counter = 0;

    for (const el of questionsAndAnswers) {
      let userAnswer = prompt(`${el.question} да/нет/выход`);
      if (userAnswer === el.correctAnswer) {
        alert('Правильно.');
        this.counter++;
      } else if (userAnswer === 'выход') {
        this.sayFinalPhrase();
        return
      } else {
        alert(`Правильный ответ "${el.correctAnswer}" `);
      }
    };

    this.sayCount();

    if (confirm('Еще разок?')) {
      this.run();

    } else {
      this.sayFinalPhrase();

    }
  },

  sayFinalPhrase() {
    alert(`Ваш счёт ${this.counter}. До встречи.`);
  },
  sayCount() {
    alert(`Ваш счёт ${this.counter}.`);

  }
};

game.run();