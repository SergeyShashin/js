describe('Function Cart', function () {
  it('addItem', function () {
    var cartFirst = new Cart();
    var item = { price: 8, quantity: 8 };
    cartFirst.addItem(item);
    expect(cartFirst.items).toEqual([item]);

  })
})