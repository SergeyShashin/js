
var cart = {
  cartEl: null,
  goodsEl: null,
  goodsInCartEl: null,

  init() {
    this.cartEl = document.getElementById('cart');
    this.goodsEl = document.getElementById('goods');
    this.goodsInCartEl = document.getElementById('goodsInCart');
    this.reset();
  },

  reset() {
    this.goodsEl.innerHTML = '';
    this.goodsInCartEl.innerHTML = '';
    this.buildGoods();
    this.buildCart();
    this.setEventHandlers();
  },

  buildGoods() {
    this.loadData('GET', 'http://localhost:3000/goods', function (data) {
      for (let good of data) {
        var trEl = document.createElement('tr');
        var tdIdEl = document.createElement('td');
        var tdNameEl = document.createElement('td');
        var tdPriceEl = document.createElement('td');
        var tdForBtnEl = document.createElement('td');
        var btnBuyEl = document.createElement('button');
        tdIdEl.textContent = good.id;
        tdNameEl.textContent = good.name;
        tdPriceEl.textContent = good.price;
        btnBuyEl.textContent = 'купить';
        btnBuyEl.dataset.id = good.id;
        btnBuyEl.dataset.name = good.name;
        btnBuyEl.dataset.price = good.price;
        trEl.appendChild(tdIdEl);
        trEl.appendChild(tdNameEl);
        trEl.appendChild(tdPriceEl);
        tdForBtnEl.appendChild(btnBuyEl);
        trEl.appendChild(tdForBtnEl);
        document.getElementById('goods').appendChild(trEl);
      }

    });
  },

  buildCart() {
    this.loadData('GET', 'http://localhost:3000/goodsInCart', function (data) {
      for (let good of data) {
        var trEl = document.createElement('tr');
        var tdIdEl = document.createElement('td');
        var tdNameEl = document.createElement('td');
        var tdPriceEl = document.createElement('td');
        var tdForBtnEl = document.createElement('td');
        var tdForBtnDelEl = document.createElement('td');
        var btnAddEl = document.createElement('button');
        var btnDelEl = document.createElement('button');
        trEl.id = good.id;
        trEl.dataset.quantity = good.quantity;
        tdIdEl.textContent = good.id;
        tdNameEl.textContent = good.name;
        tdPriceEl.textContent = good.price;
        btnAddEl.textContent = '+';
        btnDelEl.textContent = '-';
        btnAddEl.dataset.id = good.id;
        btnAddEl.dataset.name = good.name;
        btnAddEl.dataset.price = good.price;
        btnDelEl.dataset.id = good.id;
        trEl.appendChild(tdIdEl);
        trEl.appendChild(tdNameEl);
        trEl.appendChild(tdPriceEl);
        tdForBtnEl.appendChild(btnAddEl);
        tdForBtnDelEl.appendChild(btnDelEl);
        trEl.appendChild(tdForBtnEl);
        trEl.appendChild(tdForBtnDelEl);
        document.getElementById('goodsInCart').appendChild(trEl);
      }

    });
  },

  setEventHandlers() {
    this.cartEl.addEventListener('click', function (e) {
      if (e.target.tagName !== 'BUTTON') {
        return
      }
      // console.log(e.target.dataset);
      switch (e.target.textContent) {
        case 'купить':
          addToCart(e.target);
          break;
        case '+':
          console.log('Увеличить количество товара в корзине');
          break;
        case '-':
          console.log('Удалить или уменьшить товар в корзине.');
          break;
      }

      function addToCart(good) {
        console.log('Добавить товар в корзину');
        console.log(good);
        var goodInCartEl = document.getElementById(good.dataset.id);
        var quantity = goodInCartEl ? Number(goodInCartEl.dataset.quantity) + 1 : 1;

        var dataGood = {
          id: good.dataset.id,
          name: good.dataset.name,
          price: good.dataset.price,
          quantity: quantity
        }
        sendData('POST', 'http://localhost:3000/goodsInCart', function () {

        });
      }

      function sendData(method, link, callback) {
        console.log('отправить товар в корзину.')
      }


    });

  },



  loadData(method, link, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, link);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status) {
        callback(JSON.parse(xhr.responseText));
      }
    };
  },


};

window.onload = cart.init();