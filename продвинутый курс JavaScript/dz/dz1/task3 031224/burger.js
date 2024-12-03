/*
3. *Сеть фастфудов предлагает несколько видов гамбургеров:
** - маленький (50 рублей, 20 калорий);**
- большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
** - сыром (+ 10 рублей, + 20 калорий);**
** - салатом (+ 20 рублей, + 5 калорий);**
- картофелем (+ 15 рублей, + 10 калорий).

*Дополнительно гамбургер можно посыпать приправой (+ 15 рублей, 0 калорий) и полить майонезом (+ 20 рублей, + 5 калорий). *

Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Используйте ООП-подход 
(подсказка: нужен класс Гамбургер, константы, методы для выбора опций и расчета нужных величин).
*/

function Burger(size, stuffing) {
  this.price = 0;
  this.calories = 0;
  this.size = size;
  this.stuffing = stuffing;
  this.additives = [];

  switch (this.size) {
    case 'big':
      this.price += 100;
      this.calories += 40;
      break;
    case 'small':
      this.price += 50;
      this.calories += 20;
      break;
  }

  switch (this.stuffing) {
    case 'cheese':
      this.price += 10;
      this.calories += 20;
      break;
    case 'salad':
      this.price += 20;
      this.calories += 5;
      break;
    case 'potato':
      this.price += 15;
      this.calories += 10;
      break;
  }

}

Burger.prototype.getPrice = function () {
  return this.price;
}

Burger.prototype.getCalories = function () {
  return this.calories;
}

Burger.prototype.addAdditives = function (additives) {
  for (let additive of additives) {
    if (!this.additives.includes(additive)) {
      this.additives.push(additive);
      switch (additive) {
        case 'seasonings':
          this.price += 15;
          break;
        case 'mayo':
          this.price += 20;
          this.calories += 5;
          break;
      }
    }
  }
}

Burger.prototype.getAdditives = function () {
  return this.additives
}

Burger.prototype.getInfoOrder = function () {
  return `Стоимость: ${this.price}.
          Калорийность: ${this.calories}.
          Размер:${this.size}.
          Начинка: ${this.stuffing}.
          Добавки: ${this.getAdditives()}. `;
}

