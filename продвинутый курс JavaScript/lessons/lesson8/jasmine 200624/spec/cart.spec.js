describe('Cart', function () {
  it('check addItem', function () {
    var item = {
      price: 8,
      quantity: 8
    }
    var cart = new Cart();
    cart.addItem(item);

    expect(cart.items).toEqual([item]);
  });

  it('totalSum', function () {
    var item = {
      price: 8,
      quantity: 8
    }
    var cart = new Cart();
    cart.addItem(item);

    expect(cart.totalSum()).toBe(64);
  });
})