function Goods() {
}

Goods.prototype.init = function (idHTMLEl, linkDB, buttons) {
  (function ($, idHTMLEl, linkDB, buttons) {
    $.ajax({
      url: linkDB,
      success: function (data) {
        var $tableHTMLEl = $('<table/>');
        $(idHTMLEl).empty().append($tableHTMLEl);
        
        data.map(function (el) {
          $trHTMLEl = $('<tr/>');
          $tdidHTMLEl = $('<td/>', {
            text: el.id
          });
          $tdNameHTMLEl = $('<td/>', {
            text: el.nameRu
          });
          $tdQuantityHTMLEl = $('<td/>', {
            text: el.quantity,
            'data-td_quantity_id': el.id,
          });
          $tdPriceHTMLEl = $('<td/>', {
            text: el.price
          });
          $tdForBtnHTMLEl = $('<td/>');
          $tdForBtnHTMLEl.append($('<button/>', {
            text: buttons.textRu,
            class: buttons.classBtn,
            'data-id': el.id,
            'data-nameru': el.nameRu,
            'data-price': el.price,
            'data-quantity': el.quantity,
          }));
          $trHTMLEl.append($tdidHTMLEl);
          $trHTMLEl.append($tdNameHTMLEl);
          $trHTMLEl.append($tdQuantityHTMLEl);
          $trHTMLEl.append($tdPriceHTMLEl);
          $trHTMLEl.append($tdForBtnHTMLEl);
          $tableHTMLEl.append($trHTMLEl);
        });

      }
    }
    );
  })(jQuery, idHTMLEl, linkDB, buttons);
}

Goods.prototype.getCart = function () {

}