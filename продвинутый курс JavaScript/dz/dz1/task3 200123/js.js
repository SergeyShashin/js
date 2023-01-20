/*3. * Сеть фастфудов предлагает несколько видов гамбургеров:
** - маленький(50 рублей, 20 калорий);**
    - большой(100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок(обязательно):
** - сыром(+ 10 рублей, + 20 калорий);**
** - салатом(+ 20 рублей, + 5 калорий);**
    - картофелем(+ 15 рублей, + 10 калорий).

* Дополнительно гамбургер можно посыпать приправой(+ 15 рублей, 0 калорий) и полить майонезом(+ 20 рублей, + 5 калорий). *

Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Используйте ООП-подход 
(подсказка: нужен класс Гамбургер, константы, методы для выбора опций и расчета нужных величин).
*/

function Hamburger(size, stuffing) {
  this.toppings = [];

  switch (size) {
    case Hamburger.SIZE_SMALL:
      this.prise = 50;
      this.calories = 20;
      break;
    case Hamburger.SIZE_BIG:
      this.prise = 100;
      this.calories = 40;
      break;
    default:
      throw new HamburgerError(`Неверный размер ${size} `);
  }

  this.size = size;

  switch (stuffing) {
    case Hamburger.STUFFING_CHEESE:
      this.prise += 10;
      this.calories += 20;
      break;
    case Hamburger.STUFFING_SALAD:
      this.prise += 20;
      this.calories += 5;
      break;
    case Hamburger.STUFFING_POTATO:
      this.prise += 15;
      this.calories += 10;
      break;
    default:
      throw new HamburgerError(`Неверная начинка ${stuffing} `);
  }

  this.stuffing = stuffing;

}

Hamburger.SIZE_SMALL = 1;
Hamburger.SIZE_BIG = 2;

Hamburger.STUFFING_CHEESE = 1;
Hamburger.STUFFING_SALAD = 2;
Hamburger.STUFFING_POTATO = 3;

Hamburger.TOPPING_SPICE = 1;
Hamburger.STUFFING_MAYO = 2;

Hamburger.prototype.addTopping = function (topping) {

  if (!topping) {
    throw new HamburgerError(`Неверная добавка ${topping} `);
  }

  if (!this.toppings.includes(topping)) {
    this.toppings.push(topping);

    switch (topping) {
      case Hamburger.TOPPING_SPICE:
        this.prise += 15;
        this.calories += 0;
        break;
      case Hamburger.STUFFING_MAYO:
        this.prise += 20;
        this.calories += 5;
        break;
    }
  }
}

Hamburger.prototype.deleteTooping = function (topping) {
  if (!topping) {
    throw new HamburgerError(`Неверная добавка ${topping} `);
  }

  let idx = this.toppings.indexOf(topping)

  if (idx > 0) {
    this.toppings = this.toppings.slice(idx, 1);

    switch (topping) {
      case Hamburger.TOPPING_SPICE:
        this.prise -= 15;
        this.calories -= 0;
        break;
      case Hamburger.STUFFING_MAYO:
        this.prise -= 20;
        this.calories -= 5;
        break;
    }
  }

}

Hamburger.prototype.getPrise = function () {
  return this.prise;
}

Hamburger.prototype.getCalories = function () {
  return this.calories;
}

Hamburger.prototype.getSize = function () {
  return this.size;
}

Hamburger.prototype.getStuffing = function () {
  return this.stuffing;
}
Hamburger.prototype.getToppings = function () {
  return this.toppings;
}


function HamburgerError(message) {
  this.name = 'HamburgerError';
  this.error = message;
}