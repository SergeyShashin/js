'use strict';

var orderListHtmlElement = document.getElementById('orderList');
var cartHtmlElement = document.getElementById('orderList');
var resultHtmlElement = document.getElementById('result');

fillOrderList();
setEventHandlers();

/**
 * Заполняет orderList
 */
function fillOrderList() {
  loadDataFromJson('GET', 'http://localhost:3000/products', function (data) {
    data.forEach(function (product) {
      console.log(product);
      var tr = document.createElement('tr');
      var tdForBtn = document.createElement('td');
      // var productHtmlId = document.createElement('td');
      var productHtmlEl = document.createElement('td');
      var productHtmlPrice = document.createElement('td');
      var btnBuy = document.createElement('button');
      productHtmlEl.textContent = `${product.productName}`;
      // productHtmlId.textContent = product.id;
      productHtmlPrice.textContent=product.productPrice;
      btnBuy.textContent = 'Добавить';
      btnBuy.dataset.productId = product.id;
      btnBuy.dataset.productName = product.productName;
      btnBuy.dataset.productPrice = product.productPrice;
      orderListHtmlElement.appendChild(tr);
      // tr.appendChild(productHtmlId);
      tr.appendChild(productHtmlEl);
      tr.appendChild(productHtmlPrice);
      tr.appendChild(tdForBtn);
      tdForBtn.appendChild(btnBuy);
    });
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
}

function handlerClickOrderList(e) {

  var target = e.target;

  if (target.tagName !== 'BUTTON') {
    return
  }

  console.log(e.target.dataset.product);

  var dataToCart = JSON.stringify(
    {
      id: target.dataset.productId,
      productName: target.dataset.productName,
      productPrice: target.dataset.productPrice,
      productQuantity: 10000
    }
  );
  sendDataToJson('POST', 'http://localhost:3000/cart', dataToCart);

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
