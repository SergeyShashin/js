/*3. * ���� ��������� ���������� ��������� ����� �����������:
** - ���������(50 ������, 20 �������);**
    - �������(100 ������, 40 �������).
��������� ����� ���� � ����� �� ���������� ����� �������(�����������):
** - �����(+ 10 ������, + 20 �������);**
** - �������(+ 20 ������, + 5 �������);**
    - ����������(+ 15 ������, + 10 �������).

* ������������� ��������� ����� �������� ���������(+ 15 ������, 0 �������) � ������ ���������(+ 20 ������, + 5 �������). *

�������� ���������, �������������� ��������� � ������������ ����������. ����������� ���-������ 
(���������: ����� ����� ���������, ���������, ������ ��� ������ ����� � ������� ������ �������).
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