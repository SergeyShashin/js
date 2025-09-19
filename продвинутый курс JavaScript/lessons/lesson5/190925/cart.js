(function ($) {
  $(function () {
    buildGoods();
    buildCart();

    $('#goods').on('click', 'button', function (e) {
      console.log(e.target);
    });
    $('#cart').on('click', 'button', function (e) {
      console.log(e.target.dataset.id);
      $.ajax({
        url: `http://localhost:3000/cart/${e.target.dataset.id}`,
        type: 'DELETE',
        success: function () {
          buildCart()
        }
      });
    });

    function buildGoods() {
      $.ajax(
        {
          url: 'http://localhost:3000/goods',
          success: function (goods) {
            $goodsEl = $('#goods');
            $goodsEl.append($('<h3/>').text('каталог'));

            for (var product of goods) {
              var $trEl = $('<tr/>', {
              });
              var $tdNameEl = $('<td/>', {
                text: product.productName,
              });
              var $tdPriceEl = $('<td/>', {
                text: product.price
              });
              var $tdBtnBuyEl = $('<td/>', {
              });
              var $btnBuyEl = $('<button/>', {
                text: 'купить',
                'data-id': product.id,
                'data-name': product.productName,
                'data-price': product.price
              });
              $tdBtnBuyEl.append($btnBuyEl);
              $trEl.append($tdNameEl);
              $trEl.append($tdPriceEl);
              $trEl.append($tdBtnBuyEl);
              $goodsEl.append($trEl);
            }
          }
        });
    }

    function buildCart() {
      $('#cart').empty();
      $.ajax(
        {
          url: 'http://localhost:3000/cart',
          success: function (cart) {
            $cartEl = $('#cart');
            $cartEl.append($('<h3/>').text('корзина'));
            for (var product of cart) {
              var $trEl = $('<tr/>', {
              });
              var $tdNameEl = $('<td/>', {
                text: product.productName,
              });
              var $tdPriceEl = $('<td/>', {
                text: product.price
              });
              var $tdQuantityEl = $('<td/>', {
                text: `${product.quantity} шт.`
              });
              var $tdBtnDelEl = $('<td/>', {
              });
              var $btnDelEl = $('<button/>', {
                text: 'x',
                'data-id': product.id,
                'data-name': product.productName,
                'data-price': product.price
              });
              $tdBtnDelEl.append($btnDelEl);
              $trEl.append($tdNameEl);
              $trEl.append($tdPriceEl);
              $trEl.append($tdQuantityEl);
              $trEl.append($tdBtnDelEl);
              $cartEl.append($trEl);
            }
          }
        });
    }
  });
})(jQuery);