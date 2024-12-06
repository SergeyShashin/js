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
  this.size;
  this.stuffing;
  this.price = 0;
  this.calories = 0;
  this.toppings = [];

  switch (size) {
    case BURGER_SIZE_BIG:
      this.price += 100;
      this.calories += 40;
      this.size = 'большой';
      break;
    case BURGER_SIZE_SMALL:
      this.price += 50;
      this.calories += 20;
      this.size = 'маленький';
      break;
  }

  switch (stuffing) {
    case BURGER_STUFFINGS_CHEESE:
      this.price += 10;
      this.calories += 20;
      this.stuffing = 'сыр';
      break;
    case BURGER_STUFFINGS_SALAD:
      this.price += 20;
      this.calories += 5;
      this.stuffing = 'салат';
      break;
    case BURGER_STUFFINGS_POTATO:
      this.price += 15;
      this.calories += 10;
      this.stuffing = 'картофель';
      break;
  }

}

Burger.prototype.getPrice = function () {
  return this.price;
};

Burger.prototype.getCalories = function () {
  return this.calories;
};

Burger.prototype.addTopping = function (topping) {
  if (!this.toppings.includes(topping)) {
    this.toppings.push(topping);
    switch (topping) {
      case BURGER_TOPPINGS_SPICE:
        this.price += 15;
        break;
      case BURGER_TOPPINGS_MAYO:
        this.price += 20;
        this.calories += 5;
        break;
    }
  }
};

Burger.prototype.getSize = function () {
  return this.size;
};

Burger.prototype.getStuffing = function () {
  return this.stuffing;
};

Burger.prototype.getToppings = function () {
  let result = [];
  for (let topping of this.toppings) {
    topping === BURGER_TOPPINGS_SPICE ? result.push('приправа') : result.push('майонез');
  }
  return result;
};

var BURGER_SIZE_BIG = 1;
var BURGER_SIZE_SMALL = 2;
var BURGER_STUFFINGS_CHEESE = 1;
var BURGER_STUFFINGS_SALAD = 2;
var BURGER_STUFFINGS_POTATO = 3;
var BURGER_TOPPINGS_SPICE = 1;
var BURGER_TOPPINGS_MAYO = 2;

