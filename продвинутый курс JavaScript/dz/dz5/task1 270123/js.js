'use strict';

var goodsEl = document.getElementById('goods');
var cartEl = document.getElementById('cart');

buildList(goodsEl);
setClickHandlers(goodsEl, cartEl);
buildCart(cartEl);


function buildList(goodsEl) {
  getJsonData('GET', 'http://localhost:3000/goods', function (data) {
    data.forEach(function (item) {
      var liEl = document.createElement('li');
      var btnBuyEl = document.createElement('button');
      liEl.textContent = item.name + ' ' + item.price + ' ' + item.currency;
      btnBuyEl.dataset.id = item.id;
      btnBuyEl.dataset.name = item.name;
      btnBuyEl.dataset.price = item.price;
      btnBuyEl.dataset.quantity = item.quantity;
      btnBuyEl.textContent = 'Buy';
      goodsEl.appendChild(liEl);
      goodsEl.appendChild(btnBuyEl);
    });
  })
}

function buildCart(cartEl) {
  cartEl.textContent = '';
  getJsonData('GET', 'http://localhost:3000/cart', function (data) {
    data.forEach(function (item) {
      var liEl = document.createElement('li');
      var btnBuyEl = document.createElement('button');
      liEl.textContent = item.name + ' ' + item.price + ' ' + item.currency + ' ' + item.quantity;
      btnBuyEl.dataset.id = item.id;
      btnBuyEl.dataset.name = item.name;
      btnBuyEl.dataset.price = item.price;
      btnBuyEl.dataset.quantity = item.quantity;
      btnBuyEl.textContent = 'X';
      cartEl.appendChild(liEl);
      cartEl.appendChild(btnBuyEl);
    });
  });


}

function getJsonData(method, url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    }
  }
}

function setClickHandlers(goodsEl, cartEl) {
  goodsEl.addEventListener('click', function (event) {
    buyThisGood(event);
  });

  cartEl.addEventListener('click', function (event) {
    delThisGood(event);
  })
}

function buyThisGood(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  var goodId = Number(event.target.dataset.id);
  var goodEl = document.querySelector(`#cart > [data-id="${goodId}"]`);
  var name = event.target.dataset.name;
  var price = event.target.dataset.price;

  if (goodEl) {
    var data = {
      "id": goodId,
      "name": name,
      "price": price,
      "currency": 'rub',
      "quantity": Number(goodEl.dataset.quantity) + 1
    };

    sendJsonData('PATCH', 'http://localhost:3000/cart/' + goodId, function (goodsIncart) { }, data);

  } else {
    var data = {
      "id": goodId,
      "name": name,
      "price": price,
      "currency": 'rub',
      "quantity": 1
    };
    sendJsonData('POST', 'http://localhost:3000/cart', function (goodsIncart) { }, data);

  }
  buildCart(cartEl);

}

function sendJsonData(method, url, callback, data) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(data));
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    }
  }

}

function delThisGood(event) {
  if (event.target.tagName !== 'BUTTON') {
    return
  }

  console.log(event);
  var goodId = Number(event.target.dataset.id);
  var goodEl = document.querySelector(`#cart > [data-id="${goodId}"]`);
  var name = event.target.dataset.name;
  var price = event.target.dataset.price;
  var quantity = Number(goodEl.dataset.quantity);

  if (quantity > 1) {
    var data = {
      "id": goodId,
      "name": name,
      "price": price,
      "currency": 'rub',
      "quantity": quantity - 1
    };

    sendJsonData('PATCH', 'http://localhost:3000/cart/' + goodId, function (goodsIncart) { }, data);

  } else {
    var data = {
      "id": goodId,
      "name": name,
      "price": price,
      "currency": 'rub',
      "quantity": 1
    };
    sendJsonData('DELETE', 'http://localhost:3000/cart/' + goodId, function (goodsIncart) { }, data);

  }
  buildCart(cartEl);
}