describe('Function sum', function () {
  it('Should be 2+3=5', function () {
    expect(sum(2, 3)).toBe(5);
  });
  it('Should be -5-5=-10', function () {
    expect(sum(-5, -5)).toBe(-10);
  });
  it('Use flag. Should be -5-5=10', function () {
    expect(sum(-5, -5, true)).toBe(10);
  });
});