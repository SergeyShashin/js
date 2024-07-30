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
  this.priсe = 0;
  this.calories = 0;
  this.spices = [];

  switch (this.size) {
    case 'big':
      this.priсe += 100;
      this.calories += 40;
      break;
    case 'small':
      this.priсe += 50;
      this.calories += 20;
      break;
  }

  switch (this.stuffing) {
    case 'cheese':
      this.priсe += 10;
      this.calories += 20;
      break;
    case 'salad':
      this.priсe += 20;
      this.calories += 5;
      break;
    case 'potato':
      this.priсe += 15;
      this.calories += 10;
      break;
  }
}

Burger.prototype.getPrice = function () {
  return this.priсe
};

Burger.prototype.getCalories = function () {
  return this.calories
};

Burger.prototype.addSpices = function (spice) {
  this.spices.includes(spice) ? '' : this.spices.push(spice);

  for (var item of this.spices) {
    switch (item) {
      case 'spice':
        this.priсe += 15;
        this.calories += 0;
        break;
      case 'mayo':
        this.priсe += 20;
        this.calories += 5;
        break;
    }
  }
};

Burger.prototype.typeOrder = function () {
  var orderMsg = `Вы заказали ${this.size} бургер c ${this.stuffing}`;

  if (this.spices.length > 0) {
    for (var item of this.spices) {
      orderMsg += `, ${item}`
    }
  }

  orderMsg += `.\n Стоимость ${Burger.prototype.getPrice.call(this)}. Калорийность ${Burger.prototype.getCalories.call(this)}.`;

  return orderMsg
};