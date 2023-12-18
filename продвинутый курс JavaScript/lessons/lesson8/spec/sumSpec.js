describe('function sum', function () {
  it('should return sum of 2+3=5', function () {
    expect(sum(2, 3)).toBe(5);
  });
});

describe('Class: Cart', function () {
  it('should add item in items property ', function () {
    var item = {
      price: 100,
      quantity: 10
    };

    var cart = new Cart();

    cart.addItem(item);
    cart.addItem({ price: 10, quantity: 10 });
    cart.addItem({ price: 1, quantity: 10 });
    // expect(cart.items).toEqual([item]);

    expect(cart.total()).toBe(1110);
  });
  it('should total = 1110 ', function () {
    var item = {
      price: 100,
      quantity: 10
    };

    var cart = new Cart();

    cart.addItem(item);
    cart.addItem({ price: 10, quantity: 10 });
    cart.addItem({ price: 1, quantity: 10 });

    expect(cart.total()).toBe(1110);
  });

});