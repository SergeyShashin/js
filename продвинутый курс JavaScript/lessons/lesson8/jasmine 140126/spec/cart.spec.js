describe('cart', function () {
  it('addItem', function () {
    var cart = new Cart();
    cart.addItem({ name: 'someGood', price: 1, quantity: 12 });
    expect(cart.getItems()).toEqual([{ name: 'someGood', price: 1, quantity: 12 }]);
  });
  it('getTotal', function () {
    var cart = new Cart();
    cart.addItem({ name: 'someGood', price: 1, quantity: 12 });
    expect(cart.getTotal()).toBe(12);
  });
});