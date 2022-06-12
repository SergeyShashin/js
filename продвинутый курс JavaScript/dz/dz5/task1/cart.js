'use strict';

/**
 * Запросы к db.json
 * @param {string} method Метод запроса
 * @param {string} link  Ссылка на объект json
 * @param {function} callback Функция, обрабатывающая ответ
 */
function ajax(method, link, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var responce = JSON.parse(xhr.responseText);
        callback(responce);
      }
    }
  }
}

/**
 * Создает товары
 * @param {Array} products массив с объектами товаров 
 */
function createProducts(products) {
  var productsListElement = document.getElementById('productsList');
  if (productsListElement) {
    productsListElement.addEventListener('click', function (e) {
      handlerClickProductsListElement(e);
    });
    products.forEach(function (product) {
      //элемент товара
      var liElement = document.createElement('li');
      //картинка товара
      var imgProduct = new Image(100, 100);
      //кнопка купить id товара
      var btnBuy = document.createElement('button');
      btnBuy.textContent = 'Купить';
      btnBuy.id = product.id;
      btnBuy.type = 'button';
      btnBuy.dataset.name = product.name;
      btnBuy.dataset.price = product.price;
      imgProduct.src = product.ImgSrc;
      liElement.textContent = `${product.id} ${product.name}${product.price}`;
      productsListElement.appendChild(imgProduct);
      productsListElement.appendChild(liElement);
      productsListElement.appendChild(btnBuy);
    });
  }
}

function handlerClickProductsListElement(e) {
  if (e.target.tagName === "BUTTON") {
    console.log(e.target.id);

  }
}

window.onload = function () {
  //получаем массив с объектами товаров
  ajax('GET', 'http://localhost:3000/products', function (responce) {
    createProducts(responce);
  });


}