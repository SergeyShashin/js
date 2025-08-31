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
  this.size = size;
  this.stuffing = stuffing;
  this.price = 0;
  this.calories = 0;
  this.spices = [];

  switch (size) {
    case Burger.SIZE_BIG:
      this.price += 100;
      this.calories += 40;
      break;
    case Burger.SIZE_SMALL:
      this.price += 50;
      this.calories += 20;
      break;
  }

  switch (stuffing) {
    case Burger.STUFING_CHESE:
      this.price += 10;
      this.calories += 20;
      break;
    case Burger.STUFING_SALAD:
      this.price += 20;
      this.calories += 5;
      break;
    case Burger.STUFING_POTATO:
      this.price += 20;
      this.calories += 5;
      break;
  }
}

Burger.SIZE_BIG = 1;
Burger.SIZE_SMALL = 2;
Burger.STUFING_CHESE = 1;
Burger.STUFING_SALAD = 2;
Burger.STUFING_POTATO = 3;
Burger.SPICES_SAUCE = 1;
Burger.SPICES_MAYO = 2;

Burger.prototype.getPrise = function () {
  return this.price;
};

Burger.prototype.getCalories = function () {
  return this.calories;
};

Burger.prototype.addSpices = function (spice) {
  if (!this.spices.includes(spice)) {
    this.spices.push(spice);
    switch (spice) {
      case Burger.SPICES_SAUCE:
        this.price += 15;
        break;
      case Burger.SPICES_MAYO:
        this.price += 20;
        this.calories += 5;
        break;
    }
  }
};
