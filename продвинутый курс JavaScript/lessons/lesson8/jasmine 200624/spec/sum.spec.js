describe('Function sum', function () {

  it('should return sum of 3+4=7', function () {
    expect(sum(3, 4)).toBe(7);
  });

  it('should return sum abs value of -3+4=7', function () {
    expect(sum(-3, 4, true)).toBe(7);
  });
})