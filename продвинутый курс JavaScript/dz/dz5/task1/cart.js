'use strict';

window.onload = function () {
  ajax('GET', 'http://localhost:3000/products', function (responce) {
    renderProducts(responce);
  });

  this.document.getElementById('productsList').addEventListener('click', function (event) {
    productsListHandler(event);
  });



}

/**
 * Ajax
 * @param {string} method Тип запроса
 * @param {string} link Ссылка запроса
 * @param {function} calback  Функция обратного вызова для ответа
 * @param {object} data  данные для отправки
 */
function ajax(method, link, callback, data) {
  console.log(data);

  var xhr = new XMLHttpRequest();

  xhr.open(method, link);
  xhr.send();

  if (data) {
    xhr.setRequestHeader('application/json');
    console.log(xhr);
    xhr.send(JSON.stringify(data));
  }


  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  }
}

/**
 * Добавляет список товаров в HTML элемент productsList
 * @param {Array} products Массив с объектами товаров 
 */
function renderProducts(products) {
  var productsListEl = document.getElementById('productsList');
  products.forEach(function (product) {
    var productEl = document.createElement('li');
    var imgEl = new Image(100, 100);
    var btnBuyEl = document.createElement('button');
    var raitingEl = document.createElement('span');
    imgEl.src = product.imgSrc;
    productEl.textContent = `${product.id} ${product.name} ${product.price}`;
    raitingEl.innerHTML = product.raiting;
    btnBuyEl.textContent = 'Купить';
    btnBuyEl.type = 'button';
    btnBuyEl.id = product.id;
    btnBuyEl.dataset.name = product.name;
    btnBuyEl.dataset.price = product.price;
    btnBuyEl.dataset.raiting = product.raiting;
    btnBuyEl.dataset.imgSrc = product.imgSrc;
    btnBuyEl.dataset.quantity = product.quantity;
    productsListEl.appendChild(imgEl);
    productsListEl.appendChild(productEl);
    productsListEl.appendChild(raitingEl);
    productsListEl.appendChild(btnBuyEl);
  })
}

/**
 * Обрабатывает клик по кнопке купить
 * @param {HTMl} event Событие по которому был клик
 */
function productsListHandler(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  renderCart(event.target);

}

function renderCart(btnElement) {
  var cartEl = document.getElementById('cart');
  var product;
  var productEl = document.createElement('li');

  ajax('GET', 'http://localhost:3000/cart', function (responce) {

    if (responce.length === 0) {


      productEl.id = btnElement.id;
      productEl.textContent = `${btnElement.id} ${btnElement.dataset.name} ${btnElement.dataset.price}  ${btnElement.dataset.quantity}`;
      productEl.dataset.name = btnElement.dataset.name;
      productEl.dataset.price = btnElement.dataset.price;
      productEl.dataset.raiting = btnElement.dataset.raiting;
      productEl.dataset.imgSrc = btnElement.dataset.imgSrc;
      productEl.dataset.quantity = btnElement.dataset.quantity++;

      cartEl.textContent = 'Корзина';
      cartEl.appendChild(productEl);

      product = {
        id: btnElement.id,
        name: btnElement.dataset.name,
        price: btnElement.dataset.price,
        raiting: btnElement.dataset.raiting,
        imgSrc: btnElement.dataset.imgSrc,
        quantity: btnElement.dataset.quantity++
      }

      ajax('POST', 'http://localhost:3000/cart', function (responce) { }, product);

    } else {
      responce.forEach(function (item) {
        product = {
          id: item.id,
          name: item.name,
          price: item.price,
          raiting: item.raiting,
          imgSrc: item.imgSrc,
          quantity: item.quantity + 1
        }
      });
    }

  });
}







