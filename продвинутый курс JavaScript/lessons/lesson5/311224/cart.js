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

          thIdEl.textContent = 'id';
          thNameEl.textContent = 'name';
          thPriceEl.textContent = 'price';

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
          var goodsInCartEl = $('#goodsInCart')[0];
          var totalSum = 0;
          goodsInCartEl.innerHTML = '';

          var tHeadEl = document.createElement('thead');
          var tBodyEl = document.createElement('tbody');
          var thIdEl = document.createElement('th');
          var thNameEl = document.createElement('th');
          var thPriceEl = document.createElement('th');
          var thQuantityEl = document.createElement('th');
          var thSumEl = document.createElement('th');
          var thForBtnDeleteEl = document.createElement('th');

          thIdEl.textContent = 'id';
          thNameEl.textContent = 'name';
          thPriceEl.textContent = 'price';
          thQuantityEl.textContent = 'quantity';
          thSumEl.textContent = 'sum';

          tHeadEl.appendChild(thIdEl);
          tHeadEl.appendChild(thNameEl);
          tHeadEl.appendChild(thPriceEl);
          tHeadEl.appendChild(thQuantityEl);
          tHeadEl.appendChild(thSumEl);
          tHeadEl.appendChild(thForBtnDeleteEl);

          for (let el of data) {
            var trGoodEl = document.createElement('tr');
            var tdIdEl = document.createElement('td');
            var tdNameEl = document.createElement('td');
            var tdPriceEl = document.createElement('td');
            var tdQuantityEl = document.createElement('td');
            var tdSumEl = document.createElement('td');
            var tdForBtnDeleteEl = document.createElement('td');
            var btnDeleteEl = document.createElement('button');

            tdIdEl.textContent = el.id;
            tdNameEl.textContent = el.name;
            tdPriceEl.textContent = el.price;
            tdQuantityEl.textContent = el.quantity;
            tdSumEl.textContent = Number(el.quantity) * Number(el.price);

            totalSum += Number(tdSumEl.textContent);

            btnDeleteEl.textContent = '-';
            btnDeleteEl.dataset.id = el.id;
            btnDeleteEl.dataset.name = el.name;
            btnDeleteEl.dataset.price = el.price;
            btnDeleteEl.dataset.quantity = el.quantity;

            tdForBtnDeleteEl.appendChild(btnDeleteEl);

            trGoodEl.appendChild(tdIdEl);
            trGoodEl.appendChild(tdNameEl);
            trGoodEl.appendChild(tdPriceEl);
            trGoodEl.appendChild(tdQuantityEl);
            trGoodEl.appendChild(tdSumEl);
            trGoodEl.appendChild(tdForBtnDeleteEl);
            tBodyEl.appendChild(trGoodEl);
          }

          var trEl = document.createElement('tr');
          var tdTotalSumEl = document.createElement('td');
          tdTotalSumEl.textContent = totalSum;
          trEl.appendChild(tdTotalSumEl);
          tBodyEl.appendChild(trEl);

          goodsInCartEl.appendChild(tHeadEl);
          goodsInCartEl.appendChild(tBodyEl);

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

        if (target.textContent === '-') {
          deleteGoodInCart(e.target);
        }

        function addGoodInCart(goodEl) {
          var goodId = goodEl.dataset.id;
          var goodInCartEl = $(`#goodsInCart [data-id="${goodId}"]`)[0];

          if (goodInCartEl) {
            $.ajax({
              url: `http://localhost:3000/goodsIncart/${goodId}`,
              method: 'PATCH',
              headers: {
                'content-type': 'application/json'
              },
              data: JSON.stringify({
                quantity: Number(goodInCartEl.dataset.quantity) + 1,
              }),
              success() {
                cart.buildCart();
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

        function deleteGoodInCart(btnDeleteEl) {
          var goodId = btnDeleteEl.dataset.id;
          var goodQuantity = btnDeleteEl.dataset.quantity;
          console.log(goodQuantity);

          if (goodQuantity > 1) {
            $.ajax({
              url: `http://localhost:3000/goodsIncart/${goodId}`,
              method: 'PATCH',
              headers: {
                'content-type': 'application/json'
              },
              data: JSON.stringify({
                quantity: Number(goodQuantity) - 1,
              }),
              success() {
                cart.buildCart();
              }
            });
          }
          else {
            $.ajax({
              url: `http://localhost:3000/goodsIncart/${goodId}`,
              type: 'DELETE',
              headers: {
                'content-type': 'application/json'
              },

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


