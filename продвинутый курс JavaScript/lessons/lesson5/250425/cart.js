
var cart = {
  cartEl: null,
  goodsEl: null,
  goodsInCartEl: null,

  init() {
    console.log('Welcome WORLD!');
    this.cartEl = document.getElementById('cart');
    this.goodsEl = document.getElementById('goods');
    this.goodsInCartEl = document.getElementById('goodsInCart');
    this.reset();
  },

  reset() {
    this.goodsEl.innerHTML = '';
    this.goodsInCartEl.innerHTML = '';
    this.buildCart();
  },

  buildCart() {
    this.loadData('GET', 'http://localhost:3000/goods', function (data) {
      console.log(data);
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
        btnBuyEl.dataId = good.id;
        trEl.appendChild(tdIdEl);
        trEl.appendChild(tdNameEl);
        trEl.appendChild(tdPriceEl);
        tdForBtnEl.appendChild(btnBuyEl);
        trEl.appendChild(tdForBtnEl);
        document.getElementById('goods').appendChild(trEl);
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

    }



  },


};

window.onload = cart.init();