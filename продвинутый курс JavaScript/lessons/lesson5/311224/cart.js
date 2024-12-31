var cart = {
  goodsEl: null,
  goodsInCartEl: null,
  goods: null,
  goodsInCart: null,

  init() {
    this.goodsEl = document.getElementById('goods');
    this.goodsInCartEl = document.getElementById('goodsInCartEl');
    this.goods = [];
    this.goodsInCart = [];
    this.buildGoodsList();
    this.buildCart();
  },

  buildGoodsList() {

  },

  buildCart() {

  },

}

window.onload = cart.init()