'use strict';

var productsList = {
  productsListElement: null,
  products: null,

  init(products) {
    this.productListElement = document.getElementById('productsList');
    this.products = products;
  }


};

var cart = {
  cartElement: null,
  products: null,

  init(products) {
    this.cartElement = document.getElementById('cart');
    this.products = products;
  }

};

var controller = {
  productsList,
  cart,

  init() {
    productsList.init(this.getProducts('GET', 'http://localhost:3000/products'));
    cart.init(this.getProducts('GET', 'http://localhost:3000/cart'));
  },

  getProducts(method, link) {
    this.ajax(method, link, function (responce) {
      console.log(responce); //тут выводит

      return responce;
    })
  },

  ajax(method, link, callback) {
    var xml = new XMLHttpRequest();
    xml.open(method, link);
    xml.send();
    xml.onreadystatechange = function () {
      if (xml.readyState === XMLHttpRequest.DONE && xml.status === 200) {
        var responce = JSON.parse(xml.responseText);
        callback(responce);
      }
    }
  }
}

window.onload = function () {
  this.controller.init();
}