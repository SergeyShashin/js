'use strict';

//Модуль корзины. Добавление, удаление товаров.

var productsListEl = document.getElementById('productsList');
var cartEl = document.getElementById('cart');

buildList();

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
      productsListEl.appendChild(liEl);
      liEl.appendChild(btnBuy);
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