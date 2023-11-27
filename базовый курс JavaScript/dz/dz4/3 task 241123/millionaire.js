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

const settings = {
  allQuestions: 5
};

const questions = [
  {
    question: 'Это первый вопрос?',
    vaiantsAnswer: [
      'a: Первый',
      'b: Второй',
      'c: Третий',
      'd: Четвёртый',
    ],
    correctAnswer: 'a',
  },
  {
    question: 'Это второй вопрос?',
    vaiantsAnswer: [
      'a: Первый',
      'b: Второй',
      'c: Третий',
      'd: Четвёртый',
    ],
    correctAnswer: 'b',
  },
  {
    question: 'Это третий вопрос?',
    vaiantsAnswer: [
      'a: Первый',
      'b: Второй',
      'c: Третий',
      'd: Четвёртый',
    ],
    correctAnswer: 'c',
  },
  {
    question: 'Это четвёртый вопрос?',
    vaiantsAnswer: [
      'a: Первый',
      'b: Второй',
      'c: Третий',
      'd: Четвёртый',
    ],
    correctAnswer: 'd',
  },
  {
    question: 'Это пятый вопрос?',
    vaiantsAnswer: [
      'a: Первый',
      'b: Второй',
      'c: Третий',
      'd: Пятый',
    ],
    correctAnswer: 'd',
  },
];

const game = {
  settings,
  questions,
  numberoFCorrectAnswers: 0,

  run() {

    while (this.settings.allQuestions) {

      let numberQuestion = this.getRandomNumber();

      let answer = prompt(questions[numberQuestion].question + '\n' + questions[numberQuestion].vaiantsAnswer.join('\n'));
      if (answer === questions[numberQuestion].correctAnswer) {
        console.log('Ага.');
        this.numberoFCorrectAnswers++;
      } else {
        console.log('Неа.');
      }

      this.settings.allQuestions--;
    }

    console.log(`Количество правильных ответов ${this.numberoFCorrectAnswers}`)

  },

  getRandomNumber() {
    return Math.floor(Math.random() * questions.length);
  },

};

game.run();

