'use strict';

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

/**
* Класс, объекты которого описывают параметры гамбургера. 
* 
* @constructor
* @param size        Размер
* @param stuffing    Начинка
* @throws {HamburgerException}  При неправильном использовании
*/
function Hamburger(size, stuffing) {
  this.size = size;
  this.stuffing = stuffing;
  this.price = 0;
  this.calories = 0;
  this.toppings = [];

  switch (this.size) {
    case Hamburger.SIZE_SMALL:
      this.price += 50;
      this.calories += 20;
      break;
    case Hamburger.SIZE_LARGE:
      this.price += 100;
      this.calories += 40;
      break;
    default: new HamburgerException(`Размер ${this.size} отсутствует.`);
  }

  switch (this.stuffing) {
    case Hamburger.STUFFING_CHEESE:
      this.price += 10;
      this.calories += 20;
      break;
    case Hamburger.STUFFING_SALAD:
      this.price += 20;
      this.calories += 5;
      break;
    case Hamburger.STUFFING_POTATO:
      this.price += 15;
      this.calories += 10;
      break;
    default: new HamburgerException(`Начинка ${this.stuffing} отсутствует.`);
  }
}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = 1;
Hamburger.SIZE_LARGE = 2;
Hamburger.STUFFING_CHEESE = 3;
Hamburger.STUFFING_SALAD = 4;
Hamburger.STUFFING_POTATO = 5;
Hamburger.TOPPING_MAYO = 6;
Hamburger.TOPPING_SPICE = 7;

/**
* Добавить добавку к гамбургеру. Можно добавить несколько
*– при условии, что они разные.
* 
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании
*/
Hamburger.prototype.addTopping = function (topping) {
  if (!this.toppings.includes(topping)) {
    this.toppings.push(topping);
    switch (topping) {
      case Hamburger.TOPPING_MAYO:
        this.price += 20;
        this.calories += 5;
        break;
      case Hamburger.TOPPING_SPICE:
        this.price += 10;
        this.calories += 0;
        break;
      default: new HamburgerException(`Добавка ${this.topping} отсутствует.`);
    }
  }
}
/**
 * Убрать добавку – при условии, что она ранее была 
 * добавлена.
 * 
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
  var removeToppingIdx;
  this.toppings.forEach(function (element, idx) {
    if (topping === element) {
      removeToppingIdx = idx;
    }

  })
  this.toppings.splice(removeToppingIdx, 1);

}
/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
  return this.toppings;
}
/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
  return this.size;
}
/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
  return this.stuffing;
}
/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
  return this.price;
}
/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
  return this.calories;
}
/**
 * Представляет информацию об ошибке в ходе работы с гамбургером. 
 * Подробности хранятся в свойстве message.
 * @constructor 
 */
function HamburgerException(message) {
  return message;
}

var first = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
first.addTopping(6);
first.addTopping(7);
first.removeTopping(6);

console.log('Стоимость ' + first.calculatePrice());
console.log('Калорийность ' + first.calculateCalories());
console.log('Начинка ' + first.getStuffing());
console.log('Добавки ' + first.getToppings());
