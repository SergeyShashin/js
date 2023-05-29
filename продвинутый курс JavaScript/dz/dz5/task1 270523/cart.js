'use strict';

//Модуль корзины. Добавление, удаление товаров.

function buildCart() {
  $('#cart').empty();
  var sum = 0;
  $.ajax({
    url: 'http://localhost:3000/cart',
    dataType: 'json',
    success: function (data) {
      var $ul = $('<ul/>');
      var $h2 = $('<h2/>');
      data.forEach(function (product) {
        var $li = $('<li/>', {
          text: product.name + ' ' + product.price + ' руб. ' + product.quantity + ' шт.',
        });
        var $btnDel = $('<button/>', {
          text: 'X',
          class: 'delete',
          'data-id': product.id,
          'data-name': product.name,
          'data-price': product.price,
          'data-quantity': product.quantity,
        });
        sum += product.price * product.quantity;
        $ul.append($li);
        $li.append($btnDel);
        $h2.text('Сумма: ' + sum + ' руб.');
      });
      $('#cart').append($ul);
      $('#cart').append($h2);
    }
  });
}

function buildList() {
  $.ajax({
    url: 'http://localhost:3000/goods',
    dataType: 'json',
    success: function (data) {
      var $ul = $('<ul/>');
      data.forEach(function (product) {
        var $li = $('<li/>', {
          text: product.name + ' ' + product.price + ' руб.',
        });
        var $btnBuy = $('<button/>', {
          text: 'Купить',
          class: 'buy',
          'data-id': product.id,
          'data-name': product.name,
          'data-price': product.price,
        });
        $ul.append($li);
        $li.append($btnBuy);
      });
      $('#productsList').append($ul);
    }
  });

}

(function ($) {
  $(function () {
    buildCart();
    buildList();
    $('#productsList').on('click', '.buy', function () {
      var id = $(this).attr('data-id');
      var entity = $('#cart [data-id="' + id + '"]');
      console.log($(this).attr('data-quantity'));
      if (entity.length) {
        $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            quantity: +$(entity).attr('data-quantity') + 1,
          }),
          success: function () {
            buildCart();
          }
        });
      } else {
        $.ajax({
          url: 'http://localhost:3000/cart',
          type: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            id: id,
            name: $(this).attr('data-name'),
            price: $(this).attr('data-price'),
            quantity: 1,
          }),
          success: function () {
            buildCart();
          }
        });
      }
    });
  });

  $('#cart').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
      var entity = $('#cart [data-id="' + id + '"]');
      var quantityInBtn = $(this).attr('data-quantity');
      console.log(quantityInBtn);
      if (quantityInBtn>1) {
        $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            quantity: +$(entity).attr('data-quantity') - 1,
          }),
          success: function () {
            buildCart();
          }
        });
      } else {
        $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },          
          success: function () {
            buildCart();
          }
        });
      }

  })
})(jQuery);