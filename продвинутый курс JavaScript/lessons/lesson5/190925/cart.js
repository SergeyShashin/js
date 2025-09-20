(function ($) {
  $(function () {
    buildGoods();
    buildCart();
    setEventHandlers();

    function setEventHandlers() {
      $('#goods').on('click', 'button', function (e) {
        $product = $(`#cart [data-id='${e.target.dataset.id}']`);
        if ($product.length) {
          $.ajax({
            url: `http://localhost:3000/cart/${$product.attr('data-id')}`,
            type: 'PATCH',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify({
              quantity: Number($product.attr('data-quantity')) + 1
            }),
            success: function () {
              buildCart();
            }
          });
        } else {
          $.ajax({
            url: 'http://localhost:3000/cart',
            type: 'POST',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify({
              name: e.target.dataset.name,
              price: e.target.dataset.price,
              quantity: 1
            }),
            success: function () {
              buildCart();
            }
          });
        }
      });

      $('#cart').on('click', 'button', function (e) {
        if (e.target.dataset.quantity === '1') {
          $.ajax({
            url: `http://localhost:3000/cart/${e.target.dataset.id}`,
            type: 'DELETE',
            success: function () {
              buildCart();
            }
          });
        } else {
          $.ajax({
            url: `http://localhost:3000/cart/${e.target.dataset.id}`,
            type: 'PATCH',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify({
              quantity: Number(e.target.dataset.quantity) - 1
            }),
            success: function () {
              buildCart();
            }
          });
        }

      });
    }

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
                text: product.name,
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
                'data-name': product.name,
                'data-price': product.price,
                'data-quantity': product.quantity
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