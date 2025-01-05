describe('Function sum.', function () {

  it('should return sum of 2 + 3 = 5', function () {
    expect(sum(2, 3)).toBe(5);
  });

  it('should return sum of -5 -5 = -10', function () {
    expect(sum(-5, -5)).toBe(-10);
  });

  it('should return abs -[5] + [-5] = 10', function () {
    expect(sum(-5, -5, true)).toBe(10);
  });

});