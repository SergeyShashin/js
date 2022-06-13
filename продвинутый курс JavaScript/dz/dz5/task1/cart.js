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
  var xhr = new XMLHttpRequest();

  xhr.open(method, link);
  xhr.send();

  if (data) {
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
    btnBuyEl.dataset.id = product.id;
    btnBuyEl.dataset.name = product.name;
    btnBuyEl.dataset.price = product.price;
    btnBuyEl.dataset.raiting = product.raiting;
    btnBuyEl.dataset.imgSrc = product.imgSrc;
    // btnBuyEl.dataset.quantity = product.quantity;
    productsListEl.appendChild(imgEl);
    productsListEl.appendChild(productEl);
    productsListEl.appendChild(raitingEl);
    productsListEl.appendChild(btnBuyEl);
  })
}

/**
 * Добавляет товар в корзину
 * @param {HTMl} event 
 */
function productsListHandler(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  console.log(event.target);

}




