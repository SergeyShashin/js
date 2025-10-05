describe('Function sum', function () {
  it('Should be 8+8=16', function () {
    expect(sum(8, 8)).toBe(16);
  });
  it('Use flag. Should be -8+(-8)=16', function () {
    expect(sum(-8, -8, true)).toBe(16);
  });
});