'use strict';

//Модуль корзины. Добавление, удаление товаров.

function buildCart() {
  $('#cart').empty('');
  $.ajax({
    url: 'http://localhost:3000/cart',
    dataType: 'json',
    success: function (cart) {
      var $ul = $('<ul/>');
      cart.forEach(function (item) {
        var $li = $('<li/>', {
          text: item.name + ' ' + item.quantity + ' шт.',
        });

        var $button = $('<button/>', {
          text: 'X',
          class: 'delete',
          'data-id': item.id,
          'data-quantity': item.quantity
        })

        $li.append($button);
        $ul.append($li);
      });
      $('#cart').append($ul);
    }
  })

}

function buildProductsList() {
  $.ajax({
    url: 'http://localhost:3000/products',
    dataType: 'json',
    success: function (products) {
      var $ul = $('<ul/>');
      products.forEach(function (item) {
        var $li = $('<li/>', {
          text: item.name + ' ' + item.price,
        });

        var $button = $('<button/>', {
          text: 'Add',
          class: 'buy',
          'data-id': item.id,
          'data-name': item.name,
          'data-price': item.price,
          'data-quantity': item.quantity
        })

        $li.append($button);
        $ul.append($li);
      });
      $('#productsList').append($ul);
    }
  })

}

(function ($) {
  $(function () {
    buildCart();
    buildProductsList();
    $('#productsList').on('click', '.buy', function () {
      var id = $(this).attr('data-id');
      var entity = $('#cart [data-id="' + id + '"]');
      if (entity.length) {
        $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'PATCH',
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify({
            quantity: +$(entity).attr('data-quantity') + 1,
          }),
          success: function () {
            buildCart();
          }
        })

      } else {
        $.ajax({
          url: 'http://localhost:3000/cart',
          type: 'POST',
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify({
            id: id,
            quantity: 1,
            name: $(this).attr('data-name'),
            price: $(this).attr('data-price'),
          }),
          success: function () {
            buildCart();
          }
        })

      }

    })

    $('#cart').on('click', '.delete', function () {
      var id = $(this).attr('data-id');
      var entity = $('#cart [data-id="' + id + '"]');
      var dataQuantity = $(this).attr('data-quantity');
      if (entity.length && dataQuantity > 1) {
        $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'PATCH',
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify({
            quantity: +$(entity).attr('data-quantity') - 1,
          }),
          success: function () {
            buildCart();
          }
        })

      } else {
        $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'DELETE',
          headers: { 'content-type': 'application/json' },          
          success: function () {
            buildCart();
          }
        })

      }

    })

  });
})(jQuery);