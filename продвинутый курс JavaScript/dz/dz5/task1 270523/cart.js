'use strict';

//Модуль корзины. Добавление, удаление товаров.

function buildCart() {
  $.ajax({
    url: 'http://localhost:3000/cart',
    dataType: 'json',
    success: function (data) {
      var $ul = $('<ul/>');
      data.forEach(function (product) {
        var $li = $('<li/>', {
          text: product.name + ' ' + product.price + ' руб.',
        });
        var $btnDel = $('<button/>', {
          text: 'X',
          class: 'delete',
          'data-id': product.id,
          'data-name': product.name,
          'data-price': product.price,
        });
        $ul.append($li);
        $li.append($btnDel);
      });
      $('#cart').append($ul);
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
    $('#productsList').on('click', '.buy', function(){
      var id = $(this).attr('data-id');
      var entity = $('#cart[""]')
      console.log(id);
    })
  });
})(jQuery);