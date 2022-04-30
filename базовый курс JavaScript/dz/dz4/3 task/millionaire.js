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

/**
 * @type {object} Объект с вопросами
 * @property {string} Номера вопросов
 */
const questions = {
  question1: 'Вопрос №1. Какой номер вопроса? \n',
  question2: 'Вопрос №2. Какой номер вопроса? \n',
  question3: 'Вопрос №3. Какой номер вопроса? \n',
  question4: 'Вопрос №4. Какой номер вопроса? \n',
  question5: 'Вопрос №5. Какой номер вопроса? \n',
};

/**
 * @type {object} Объект с правильными ответами
 * @property {int} Правильные ответы
 */
const corectAnswers = {
  question1: 1,
  question2: 2,
  question3: 3,
  question4: 4,
  question5: 5,
};

/**
 * @type {object} Объект игры
 * @property {questions} Объект с вопросами
 * @property {corectAnswers} Объект с правильными ответами
 * @property {int} 'quantityCorrectAnswers Количество правильных ответов'
 */
const game = {
  questions,
  corectAnswers,
  quantityCorrectAnswers: null,

  run() {

    while (true) {
      this.quantityCorrectAnswers = 0;

      for (let key in questions) {
        let answerUser;

        while (true) {
          let possibleVariants = [1, 2, 3, 4, 5];
          answerUser = +prompt(`${questions[key]}Варианты ответа: \n 1. 1 \n 2. 2 \n 3. 3 \n 4. 4`);
          if (possibleVariants.includes(answerUser)) {
            break;
          } else {
            continue;
          }
        }

        if (answerUser === corectAnswers[key]) {
          this.quantityCorrectAnswers++;
        }
      }

      if (confirm(`Вы ответили правильно ${this.quantityCorrectAnswers} раз(а). Играем еще?`)) {
        continue;
      } else {
        alert('До следующего раза.')
        return;
      }
    }

  }
};

//Запуск игры
game.run();