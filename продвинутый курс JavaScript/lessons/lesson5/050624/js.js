'use strict';

var orderListHtmlElement = document.getElementById('orderList');
var cartHtmlElement = document.getElementById('cart');

fillOrderList();
buildCart();
setEventHandlers();

/**
 * Заполняет orderList
 */
function fillOrderList() {
  loadDataFromJson('GET', 'http://localhost:3000/products', function (data) {
    data.forEach(function (product) {
      // console.log(product);
      var tr = document.createElement('tr');
      var tdForBtn = document.createElement('td');
      var productHtmlEl = document.createElement('td');
      var productHtmlPrice = document.createElement('td');
      var currency = document.createElement('td');
      var btnBuy = document.createElement('button');
      productHtmlEl.textContent = `${product.productName}`;
      productHtmlPrice.textContent = product.productPrice;
      btnBuy.textContent = '+';
      currency.textContent = 'руб.';
      btnBuy.dataset.productId = product.id;
      btnBuy.dataset.productName = product.productName;
      btnBuy.dataset.productPrice = product.productPrice;
      orderListHtmlElement.appendChild(tr);
      tr.appendChild(productHtmlEl);
      tr.appendChild(productHtmlPrice);
      tr.appendChild(currency);
      tr.appendChild(tdForBtn);
      tdForBtn.appendChild(btnBuy);
    });
  });
}

function buildCart() {
  loadDataFromJson('GET', 'http://localhost:3000/cart', function (dataFromCartJson) {
    var sumPrice = 0;
    var sumQuantity = 0;
    dataFromCartJson.forEach(function (product) {
      var tr = document.createElement('tr');
      var tdForBtn = document.createElement('td');
      var productHtmlEl = document.createElement('td');
      var productHtmlPrice = document.createElement('td');
      var productQuantityHtmlEl = document.createElement('td');
      var currency = document.createElement('td');
      var units = document.createElement('td');
      var btnDel = document.createElement('button');

      productHtmlEl.textContent = product.productName;
      productHtmlPrice.textContent = product.productPrice;
      productQuantityHtmlEl.textContent = product.productQuantity;
      btnDel.textContent = '-';
      currency.textContent = 'руб.';
      units.textContent = 'шт.';

      productHtmlEl.dataset.productId = product.id;
      productHtmlEl.dataset.productName = product.productName;
      productHtmlEl.dataset.productPrice = product.productPrice;
      productHtmlEl.dataset.productQuantity = product.productQuantity;

      btnDel.dataset.productId = product.id;
      btnDel.dataset.productName = product.productName;
      btnDel.dataset.productPrice = product.productPrice;
      btnDel.dataset.productQuantity = product.productQuantity;
      sumPrice += product.productQuantity * product.productPrice;
      sumQuantity += product.productQuantity;
      cartHtmlElement.appendChild(tr);
      tr.appendChild(productHtmlEl);
      tr.appendChild(productHtmlPrice);
      tr.appendChild(currency);
      tr.appendChild(productQuantityHtmlEl);
      tr.appendChild(units);
      tr.appendChild(tdForBtn);
      tdForBtn.appendChild(btnDel);
    });

    document.getElementById('sumPrice').textContent = sumPrice;
    document.getElementById('sumQuantity').textContent = sumQuantity;
  });

}

/**
 * Загружает данные из файла JSON
 * @param {string} method Один из методов (GET, POST, PATCH, DELETE) получения данных.
 * @param {string} link Ссылка для получения данных.
 * @param {function} callback Функция, возвращающая данные после их получения.
 */
function loadDataFromJson(method, link, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {

    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      callback(data);
    }

  };
}


function setEventHandlers() {
  orderListHtmlElement.addEventListener('click', function (e) {
    handlerClickOrderList(e);
  });
  cartHtmlElement.addEventListener('click', function (e) {
    handlerClickCart(e);
  });
}

function handlerClickOrderList(e) {

  var target = e.target;

  if (target.tagName !== 'BUTTON') {
    return
  }

  var productId = target.dataset.productId;
  var dataToCart;

  var productInCart = document.querySelector(`#cart [data-product-id="${productId}"]`);
  if (productInCart) {

    dataToCart = {
      id: productInCart.dataset.productId,
      productName: productInCart.dataset.productName,
      productPrice: productInCart.dataset.productPrice,
      productQuantity: Number(productInCart.dataset.productQuantity) + 1
    };
    sendDataToJson('PATCH', `http://localhost:3000/cart/${productId}`, JSON.stringify(dataToCart));
  } else {
    dataToCart = {
      id: productId,
      productName: target.dataset.productName,
      productPrice: target.dataset.productPrice,
      productQuantity: 1
    };
    sendDataToJson('POST', 'http://localhost:3000/cart', JSON.stringify(dataToCart));

  };
  cartHtmlElement.innerHTML = '';
  buildCart();

}

function sendDataToJson(method, link, data) {

  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.setRequestHeader(
    "content-Type",
    `application/json`,
  );
  xhr.send(data);

}

function handlerClickCart(e) {
  var target= e.target;

  if (target.tagName !== 'BUTTON') {
    return
  }

  if (target.dataset.productQuantity === '1') {
    sendDataToJson('DELETE', `http://localhost:3000/cart/${target.dataset.productId}`, null);

  } else {
    sendDataToJson('PATCH', `http://localhost:3000/cart/${target.dataset.productId}`, JSON.stringify({ productQuantity: Number(e.target.dataset.productQuantity) - 1 }));
  }
  cartHtmlElement.innerHTML = '';
  buildCart();

}