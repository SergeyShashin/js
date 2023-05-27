'use strict';

//Модуль корзины. Добавление, удаление товаров.

var productsListEl = document.getElementById('productsList');
var cartEl = document.getElementById('cart');

buildList();
setHandlers();

function setHandlers() {
  productsListEl.addEventListener('click', function (event) {
    return btnBuyHandler(event);
  });
  cartEl.addEventListener('click', function (event) {
    return btnBuyHandlerDelete(event);
  });
}

function btnBuyHandlerDelete(event) {
  if (event.target.tagName === 'BUTTON') {
    var btnClick = event.target;
    var product = {
      id: btnClick.id,
      name: btnClick.dataset.name,
      price: btnClick.dataset.price,
      quantity: btnClick.dataset.quantity--,
    }
    deleteFromCart(product);
  }
}

function deleteFromCart(product){
  updateData('DELETE', 'http://localhost:3000/cart/' + product.id, product);
  buildCart();
}

function btnBuyHandler(event) {
  if (event.target.tagName === 'BUTTON') {
    var btnClick = event.target;
    var product = {
      id: btnClick.id,
      name: btnClick.dataset.name,
      price: btnClick.dataset.price,
      quantity: btnClick.dataset.quantity++,
    }
    addToCart(product);
  }
}

function addToCart(product) {
  updateData('PATCH', 'http://localhost:3000/products/' + product.id, product); //не обновляет количество?
  buildList();
  sendData('POST', 'http://localhost:3000/cart', product);
  buildCart();
}

function sendData(method, url, product) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(product));
}

function updateData(method, url, product) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-type", "application/json");
  console.log(JSON.stringify(product));
  xhr.send(JSON.stringify(product));
}

function getData(method, url, callback) {
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

function buildList() {
  productsListEl.innerHTML = '';
  getData('GET', 'http://localhost:3000/products', function (data) {
    data.forEach(function (item) {
      var liEl = document.createElement('li');
      liEl.textContent = item.name + ' ' + item.price;
      var btnBuy = document.createElement('button');
      btnBuy.textContent = 'Купить';
      btnBuy.id = item.id;
      btnBuy.dataset.name = item.name;
      btnBuy.dataset.price = item.price;
      btnBuy.dataset.quantity = item.quantity;
      productsListEl.appendChild(liEl);
      liEl.appendChild(btnBuy);
    });
  });
}

function buildCart() {
  cartEl.innerHTML = '';
  getData('GET', 'http://localhost:3000/cart', function (data) {
    data.forEach(function (item) {
      var liEl = document.createElement('li');
      liEl.textContent = item.name + ' ' + item.price + ' руб. ' + item.quantity + ' шт.';
      var btnDelete = document.createElement('button');
      btnDelete.textContent = 'X';
      btnDelete.id = item.id;
      btnDelete.dataset.name = item.name;
      btnDelete.dataset.price = item.price;
      btnDelete.dataset.quantity = item.quantity;
      cartEl.appendChild(liEl);
      liEl.appendChild(btnDelete);
    });
  });
}

// (
//   function ($) {
//     var productsListEl = document.getElementById('productsList');
//     var cartEl = document.getElementById('cart');

//     buildList();

//     function getData(method, url, callback) {
//       $.ajax({
//         url: url,
//         success: function(data){
//           callback(data);
//         }
//       })
//     }

//     function buildList() {
//       getData('GET', 'http://localhost:3000/products', function (data) {
//         data.forEach(function (item) {
//           var liEl = document.createElement('li');
//           liEl.textContent = item.name + ' ' + item.price;
//           var btnBuy = document.createElement('button');
//           btnBuy.textContent = 'Купить';
//           btnBuy.id = item.id;
//           btnBuy.dataset.name = item.name;
//           btnBuy.dataset.price = item.price;
//           productsListEl.appendChild(liEl);
//           liEl.appendChild(btnBuy);
//         });
//       });
//     }


//   }
// )(jQuery);