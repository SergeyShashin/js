describe('Cart', function () {
  it('AddItem', function () {
    var cart = new Cart();
    item = { name: 'трусы', price: 800, quantity: 1 };
    cart.addItem(item);
    expect(cart.items).toEqual([item]);
  });
  it('GetSum', function () {
    var cart = new Cart();
    cart.addItem({ name: 'трусы', price: 800, quantity: 1 });
    cart.addItem({ name: 'джинсы', price: 8000, quantity: 1 });
    expect(cart.getSum()).toBe(8800);
  });
})