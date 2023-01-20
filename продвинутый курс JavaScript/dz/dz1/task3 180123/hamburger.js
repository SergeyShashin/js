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

let hamburgerEl = document.getElementById('hamburger');
let monitorEl = document.getElementById('monitor');
let orderEl = document.getElementById('order');
monitorEl.textContent = '';
let size;
let cost;
let calories;
let typeStuffing = '';
let typeTopping = '';

hamburgerEl.addEventListener('click', (event) => setEventHandlers(event));

function setEventHandlers(event) {

  if (event.target.tagName !== 'DIV') {
    return
  };

  let idParentEl = event.target.parentElement.id;

  switch (idParentEl) {
    case 'hamburgerSize':
      cost = 0;
      calories = 0;
      typeStuffing = '';
      typeTopping = '';
      size = event.target.dataset.size;
      cost += Number(event.target.dataset.price);
      calories += Number(event.target.dataset.calories);
      break;
    case 'stuffings':
      typeStuffing = event.target.id
      cost += Number(event.target.dataset.price);
      calories += Number(event.target.dataset.calories);
      break;
    case 'toppings':
      typeTopping = event.target.id
      cost += Number(event.target.dataset.price);
      calories += Number(event.target.dataset.calories);
      break;
  }

  monitorEl.textContent = `Syze: ${size}, Stuffing: ${typeStuffing}, Topping: ${typeTopping}, Cost: ${cost}, Calories: ${calories}.`

  orderEl.addEventListener('click', (event) => orderElHandler(event));

  function orderElHandler(event) {
    event.preventDefault();
    if (size && typeStuffing) {
      alert(`Your order. Syze: ${size}, Stuffing: ${typeStuffing}, Topping: ${typeTopping}, Cost: ${cost}, Calories: ${calories}.`);
      event.stopImmediatePropagation();
      return new Hamburger(size, typeStuffing, typeTopping, cost, calories);
    } else {
      alert('Please select size and stuffing.');
      event.stopImmediatePropagation();
    }

  }
}


function Hamburger(size, typeStuffing, typeTopping, cost, calories) {
  this.size = size;
  this.typeStuffing = typeStuffing;
  this.typeTopping = typeTopping;
  this.cost = cost;
  this.calories = calories;

  this.printOrder = function () {
    alert(`Your order. Syze: ${size}, Stuffing: ${typeStuffing}, Topping: ${typeTopping}, Cost: ${cost}, Calories: ${calories}.`);
  }

}