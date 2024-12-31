(function ($) {
  var cart = {
    goodsInCartEl: null,

    init() {
      this.goodsInCartEl = $('#goodsInCartEl');
      this.buildGoodsList();
      this.setEventHandlers();
      this.buildCart();
    },

    buildGoodsList() {
      $.ajax({
        url: 'http://localhost:3000/goods',
        dataType: 'json',
        success(data) {
          var goodsEl = $('#goods')[0];

          var tHeadEl = document.createElement('thead');
          var tBodyEl = document.createElement('tbody');
          var thIdEl = document.createElement('th');
          var thNameEl = document.createElement('th');
          var thPriceEl = document.createElement('th');
          var thForBtnOrderEl = document.createElement('th');

          tHeadEl.appendChild(thIdEl);
          tHeadEl.appendChild(thNameEl);
          tHeadEl.appendChild(thPriceEl);
          tHeadEl.appendChild(thForBtnOrderEl);

          goodsEl.appendChild(tHeadEl);
          goodsEl.appendChild(tBodyEl);

          for (let el of data) {
            var trGoodEl = document.createElement('tr');
            var tdIdEl = document.createElement('td');
            var tdNameEl = document.createElement('td');
            var tdPriceEl = document.createElement('td');
            var tdForBtnOrderEl = document.createElement('td');
            var btnOrderEl = document.createElement('button');

            thIdEl.textContent = 'id';
            thNameEl.textContent = 'name';
            thPriceEl.textContent = 'price';

            tdIdEl.textContent = el.id;
            tdNameEl.textContent = el.name;
            tdPriceEl.textContent = el.price;

            btnOrderEl.textContent = 'Заказать';
            btnOrderEl.dataset.id = el.id;
            btnOrderEl.dataset.name = el.name;
            btnOrderEl.dataset.price = el.price;

            tdForBtnOrderEl.appendChild(btnOrderEl);

            trGoodEl.appendChild(tdIdEl);
            trGoodEl.appendChild(tdNameEl);
            trGoodEl.appendChild(tdPriceEl);
            trGoodEl.appendChild(tdForBtnOrderEl);
            tBodyEl.appendChild(trGoodEl);
          }
        }
      });
    },

    buildCart() {
      $.ajax({
        url: 'http://localhost:3000/goodsIncart',
        dataType: 'json',
        success(data) {
          console.log(data);
        }
      });

    },

    setEventHandlers() {
      $('#cart').on('click', function (e) {
        var target = e.target;
        if (target.tagName !== 'BUTTON') {
          return
        }

        if (target.textContent === 'Заказать') {
          addGoodInCart(e.target);
        }

        function addGoodInCart(goodEl) {
          var goodId = goodEl.dataset.id;

          if ($(`#goodsInCart [data-id="${goodId}"]`)[0]) {
            $.ajax({
              url: `http://localhost:3000/goodsIncart/${goodId}`,
              method: 'PATCH',
              success() {
                buildCart();
              }
            });
          } else {
            $.ajax({
              url: 'http://localhost:3000/goodsIncart',
              type: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              data: JSON.stringify({
                id: goodId,
                name: goodEl.dataset.name,
                price: goodEl.dataset.price,
                quantity: 1,
              }),

              success() {
                cart.buildCart();
              }
            });

          }
        }
      });


    },



  };

  window.onload = cart.init();
})(jQuery);


