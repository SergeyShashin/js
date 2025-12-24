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
  this.toppings = [];

  console.log(this.size, this.stuffing)

  switch (this.size) {
    case 'big':
      this.price += 100;
      this.calories += 40;
      break;
    case 'small':
      this.price += 50;
      this.calories += 20;
      break;
    default:
      throw BurgerExeption(`Что-то с размером. ${this.size}`);
  }

  switch (this.stuffing) {
    case Burger.CHEESE:
      this.price += 10;
      this.calories += 20;
      break;
    case Burger.SALAD:
      this.price += 20;
      this.calories += 5;
      break;
    case Burger.POTATO:
      this.price += 15;
      this.calories += 10;
      break;

    default:
      throw BurgerExeption(`Что-то с начинкой. ${this.stuffing}`);
  }

}

Burger.prototype.getPrice = function () {
  return this.price;
}

Burger.prototype.getCalories = function () {
  return this.calories;
}

Burger.prototype.addTopping = function (topping) {
  if (!this.toppings.includes(topping)) {
    this.toppings.push(topping);
    this.toppings.map(el => {
      switch (el) {
        case Burger.SPICES:
          this.price += 15;
          break;
        case Burger.MAYO:
          this.price += 20;
          this.calories += 5;
          break;

        default:
          throw BurgerExeption(`Что-то с начинкой. ${this.stuffing}`);
      }
    })
  }
}


function BurgerExeption(msg) {
  return msg
}

Burger.CHEESE = 0;
Burger.SALAD = 1;
Burger.POTATO = 2;

Burger.SPICES = 0;
Burger.MAYO = 1;