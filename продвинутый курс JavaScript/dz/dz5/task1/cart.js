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
 * Получаем список товаров в корзине
 * @param {string} method Метод запроса
 * @param {string} link  Ссылка на объект json
 * @param {function} callback Функция, обрабатывающая ответ
 */
function getCart(method, link, callback) {
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
 *Добавляем товар в корзину методом Post
 * @param {string} method Метод запроса
 * @param {string} link  Ссылка на объект json
 * @param {function} callback Функция, обрабатывающая ответ
 */
function postCart(method, link, product) {
  console.log(product);
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send(JSON.stringify({
    id:product.id,
    name:product.name,
    price:product.price,
    raiting:product.raiting,
    imgSrc: product.imgSrc
  }));
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
      var raitingEl = document.createElement('span');
      btnBuy.textContent = 'Купить';
      btnBuy.id = product.id;
      btnBuy.type = 'button';
      btnBuy.dataset.name = product.name;
      btnBuy.dataset.price = product.price;
      btnBuy.dataset.raiting = product.raiting;
      btnBuy.dataset.imgSrc = product.imgSrc;
      imgProduct.src = product.imgSrc;
      liElement.textContent = `${product.id} ${product.name} ${product.price}`;
      raitingEl.innerHTML = product.raiting;
      productsListElement.appendChild(imgProduct);
      productsListElement.appendChild(liElement);
      productsListElement.appendChild(raitingEl);
      productsListElement.appendChild(btnBuy);
    });
  }
}

function handlerClickProductsListElement(e) {
  if (e.target.tagName === "BUTTON") {
    var product = {
      id: e.target.id,
      name: e.target.dataset.name,
      price: e.target.dataset.price,
      raiting: e.target.dataset.raiting,
      imgSrc: e.target.dataset.imgSrc
    }

    addTocart(product);

  }
}

function addTocart(product) {
  getCart('GET', 'http://localhost:3000/cart', function (responce) {
    responce.forEach(function (item) {
      if (item.id === +product.id) {
        console.log('Товар ' + product.id + ' есть в корзине. Запускаем метод Putch');        
      } else {
        console.log('Запускаем метод Post');
        postCart('POST', 'http://localhost:3000/cart', product);
      }

    });
  }
  );
}


window.onload = function () {
  //получаем массив с объектами товаров  
  ajax('GET', 'http://localhost:3000/products', function (responce) {
    createProducts(responce);
  });

}