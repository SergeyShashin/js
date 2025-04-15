
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
  this.toppings = [];
  this.price = 0;
  this.calories = 0;

  switch (size) {
    case Burger.SIZE_BIG:
      this.price += 100;
      this.calories += 40;
      break;
    case Burger.SIZE_SMALL:
      this.price += 20;
      this.calories += 50;
      break;
    default: throw new BurgerError(`Что-то с размером. ${this.size}`);
  }
  this.size = size;

  switch (stuffing) {
    case Burger.STUFFING_CHEESE:
      this.price += 10;
      this.calories += 20;
      break;
    case Burger.STUFFING_SALAD:
      this.price += 20;
      this.calories += 5;
      break;
    case Burger.STUFFING_POTATO:
      this.price += 15;
      this.calories += 10;
      break;
    default: throw new BurgerError(`Что-то с начинкой. ${this.stuffing}`);
  }
  this.stuffing = stuffing;
}

Burger.SIZE_BIG = 1;
Burger.SIZE_SMALL = 2;
Burger.STUFFING_CHEESE = 1;
Burger.STUFFING_SALAD = 2;
Burger.STUFFING_POTATO = 3;
Burger.TOPPING_SPICES = 1;
Burger.TOPPING_MAYO = 2;

Burger.prototype.addTopping = function (topping) {
  if (!this.toppings.includes(topping)) {
    this.toppings.push(topping);
    switch (topping) {
      case Burger.TOPPING_SPICES:
        this.price += 15;
        this.calories += 0;
        break;
      case Burger.TOPPING_MAYO:
        this.price += 20;
        this.calories += 5;
        break;
      default: throw new BurgerError(`Что-то с добавкой.${topping}`);
    }
  }
}

Burger.prototype.calculate = function () {
  return this.price;
};

Burger.prototype.getCalories = function () {
  return this.calories;
};

Burger.prototype.getSize = function () {
  return this.size;
};

Burger.prototype.getStuffing = function () {
  return this.stuffing;
};

Burger.prototype.getToppings = function () {
  return this.toppings;
};

function BurgerError(msg) {
  this.name = 'BurgerError';
  this.msg = msg;
}