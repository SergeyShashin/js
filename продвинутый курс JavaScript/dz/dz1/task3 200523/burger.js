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

var burgers = [];

document.addEventListener('submit', (e) => handlerSubmit(e));

function handlerSubmit(e) {
  var propsBurger = [];
  var inputs = e.target.querySelectorAll('input');

  for (var input of inputs) {
    input.checked ? propsBurger.push(input.id) : '';
  }

  if (!propsBurger.includes('bigSize') && !propsBurger.includes('smallSize')) {
    return alert('Нужно выбрать размер бургера.');
  }

  if (!propsBurger.includes('cheese') && !propsBurger.includes('salad') && !propsBurger.includes('potato')) {
    return alert('Нужно выбрать начинку.');
  }

  var burger = new Burger(propsBurger);
  burgers.push(burger);
  // alert(`Стоимость: ${burger.getCost()}. Калорийность: ${burger.getNumberСalories()}.`);
  e.preventDefault();
  document.getElementById('result').textContent = `Стоимость: ${burger.getCost()}. Калорийность: ${burger.getNumberСalories()}.`;
  console.log(burgers);
}

function Burger(props) {
  this.props = props;
  this.cost = 0;
  this.numberСalories = 0;

  for (var property of props) {
    switch (property) {
      case 'bigSize':
        this.cost += 100;
        this.numberСalories += 40;
        break;
      case 'smallSize':
        this.cost += 50;
        this.numberСalories += 20;
        break;
      case 'cheese':
        this.cost += 10;
        this.numberСalories += 20;
        break;
      case 'salad':
        this.cost += 20;
        this.numberСalories += 5;
        break;
      case 'potato':
        this.cost += 15;
        this.numberСalories += 10;
        break;
      case 'sauce':
        this.cost += 15;
        this.numberСalories += 0;
        break;
      case 'mayo':
        this.cost += 20;
        this.numberСalories += 5;
        break;
    }
  }
}

Burger.prototype.getCost = function () {
  return this.cost
}
Burger.prototype.getNumberСalories = function () {
  return this.numberСalories
}
