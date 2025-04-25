(function ($) {
  var cart = {
    cartEl: null,
    goodsEL: null,
    goodsInCartEl: null,
    init() {
      this.cartEl = $('#cart')[0];
      this.goodsEl = $('#goods')[0];
      this.goodsInCartEl = $('#goodsInCart')[0];
      this.reset();
    },
    reset() {
      console.log(this.goodsEl);
    }

  }

  cart.init();

})(jQuery);
