function Cart() {
  Goods.call(this);
}

Cart.prototype = Object.create(Goods.prototype);
Cart.prototype.render = function (idCartHTMLEl, linkDB, typeQuery, buttons, target) {

  (function ($, idCartHTMLEl, linkDB, typeQuery, buttons, target) {
    var { id, nameru, price, quantity } = target.dataset;
    $.ajax({
      url: linkDB,
      type: typeQuery,
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify({
        id: id,
        nameRu: nameru,
        price: price,
        quantity: quantity,
      }),
      success: function () {
        if (typeQuery === 'POST') {
          Cart.prototype.init.call(this, idCartHTMLEl, linkDB, buttons);
        } else if (typeQuery === 'PATCH') {
          $(`#cart [data-td_quantity_id="${id}"]`).text(quantity);
        } else if (typeQuery === 'DELETE') {
          target.parentElement.parentElement.remove();
        }
        $(`#cart [data-id="${id}"]`).attr('data-quantity', quantity);
      }
    })
  })(jQuery, idCartHTMLEl, linkDB, typeQuery, buttons, target);

};

Cart.prototype.renderAmount = function (linkDB) {
  (
    function ($, linkDB) {
      $.ajax({
        url: linkDB,
        success: function (data) {
          var amount = 0;
          data.map(function (el) {
            amount += el.quantity * el.price;
          });
          $('#cartAmount').text(amount);
        }
      });
    }
  )(jQuery, linkDB)

}

