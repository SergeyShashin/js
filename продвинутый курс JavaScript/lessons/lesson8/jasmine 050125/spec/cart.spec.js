describe('Class: Cart.', function () {

  it('should add item and items property equal', function () {
    var cart = new Cart();
    var item = { price: 1, quantity: 8 };
    cart.add(item);
    expect(cart.items).toEqual([item]);
  });

  it('should total 800', function () {
    var cart = new Cart();
    var item = { price: 1, quantity: 1 };
    var item2 = { price: 1, quantity: 700 };
    var item3 = { price: 1, quantity: 99 };
    cart.add(item);
    cart.add(item2);
    cart.add(item3);
    expect(cart.total()).toBe(800);
  });


});