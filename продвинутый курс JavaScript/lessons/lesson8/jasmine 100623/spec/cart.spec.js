describe('Function: sum', function () {
  it('should return sum of 2+2 = 4', function () {
    expect(sum(2, 2)).toBe(4);
  });
  it('should return sum of 2+3 = 5', function () {
    expect(sum(2, 3)).toBe(5);
  });
  it('should return sum of -2+-3 = -5', function () {
    expect(sum(-2, -3, true)).toBe(5);
  });
});


describe('Function: cart', function () {

  it('should add item in items property', function () {
    var item = {
      price: 100,
      quantity: 2
    };

    var cart = new Cart();
    cart.addToCart(item);

    expect(cart.items).toEqual([item]);

  });

  it('should return total', function () {

    var cart = new Cart();
    cart.addToCart({price: 200, quantity: 1});
    cart.addToCart({price: 150, quantity: 2});
    cart.addToCart({price: 40, quantity: 5});

    expect(cart.total()).toBe(700);

  });

})