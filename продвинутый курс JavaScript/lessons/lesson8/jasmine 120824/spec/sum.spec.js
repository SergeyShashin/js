describe('Function: sum', function () {
  it('should return sum of 2+3=5', function () {
    expect(sum(2, 3)).toBe(5);
  });

  it('should return sum of -9+17=8', function () {
    expect(sum(-9, 17)).toBe(8);
  });

  it('should return sum of -4+4=8', function () {
    expect(sum(-4, 4, true)).toBe(8);
  });
});