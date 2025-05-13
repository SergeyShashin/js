describe('Function Cart', function () {
  it('addItem', function () {
    var cartFirst = new Cart();
    var item = { price: 8, quantity: 8 };
    cartFirst.addItem(item);
    expect(cartFirst.items).toEqual([item]);
  });

  it('total', function () {
    var cartSecond = new Cart();

    for (let i = 0; i < 4; i++) {
      cartSecond.addItem({ price: 1, quantity: 222 });
    }

    expect(cartSecond.total()).toBe(888);
  });
})