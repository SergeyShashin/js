describe('cart', function () {

  it('add item', function () {
    var cart = new Cart();

    cart.addItem({ price: 100, quantity: 10 });

    expect(cart.items).toEqual([{ price: 100, quantity: 10 }]);

  })

  it('total', function () {
    var cart = new Cart();

    cart.addItem({ price: 100, quantity: 10 });

    expect(cart.cartTotal()).toEqual(1000);
  })

})