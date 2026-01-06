function App() {
  this.goods;
  this.cart;
}

App.prototype.init = function () {
  this.goods = new Goods();
  this.cart = new Cart();
  this.goods.init('#goods', 'http://localhost:3000/goods', { classBtn: 'btnTake', textRu: 'Взять' });
  this.cart.init('#cart', 'http://localhost:3000/cart', { classBtn: 'btnReturn', textRu: 'Вернуть' });

  window.addEventListener('click', function (e) {
    switch (e.target.className) {
      case 'btnTake':
        if (document.querySelector(`#cart [data-id="${e.target.dataset.id}"]`)) {
          e.target.dataset.quantity = +e.target.dataset.quantity + 1;
          app.cart.render('#cart', `http://localhost:3000/cart/${e.target.dataset.id}`, 'PATCH', { classBtn: 'btnReturn', textRu: 'Вернуть' }, e.target);
        } else {
          app.cart.render('#cart', 'http://localhost:3000/cart', 'POST', { classBtn: 'btnReturn', textRu: 'Вернуть' }, e.target);
        }
        break;
      case 'btnReturn':
        e.target.dataset.quantity = +e.target.dataset.quantity - 1;
        if (+e.target.dataset.quantity > 0) {
          app.cart.render('#cart', `http://localhost:3000/cart/${e.target.dataset.id}`, 'PATCH', { classBtn: 'btnReturn', textRu: 'Вернуть' }, e.target);
        } else if (+e.target.dataset.quantity === 0) {
          app.cart.render('#cart', `http://localhost:3000/cart/${e.target.dataset.id}`, 'DELETE', { classBtn: 'btnReturn', textRu: 'Вернуть' }, e.target);
        }
        break;
    }

    app.cart.renderAmount('http://localhost:3000/cart');

  });
}