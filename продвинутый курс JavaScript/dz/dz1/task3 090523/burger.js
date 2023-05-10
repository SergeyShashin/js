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

function Hamburger(size, stuffing) {
  this.cost = 0;
  this.calories = 0;
  switch (size) {
    case 'SIZE_SMALL':
      this.cost += 50;
      this.calories += 20;
      break;
    case 'SIZE_BIG':
      this.cost += 100;
      this.calories += 40;
      break;
  }

  switch (stuffing) {
    case 'STUFFING_CHEESE':
      this.cost += 10;
      this.calories += 20;
      break;
    case 'STUFFING_SALAD':
      this.cost += 20;
      this.calories += 5;
      break;
    case 'STUFFING_POTATO':
      this.cost += 15;
      this.calories += 10;
      break;
  }
}

Hamburger.prototype.getCost = function () {
  return this.cost;
}

Hamburger.prototype.getCalories = function () {
  return this.calories;
}

Hamburger.prototype.addSpice = function () {
  this.cost += 15;
}

Hamburger.prototype.addMayonnaise = function () {
  this.cost += 20;
  this.calories += 5;
}

var HAMBURGER_SIZE_SMAll = 0;
var HAMBURGER_SIZE_BIG = 1;
var STUFFING_CHEESE = 2;
var STUFFING_SALAD = 3;
var STUFFING_POTATO = 4;