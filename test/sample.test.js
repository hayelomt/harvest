const { expect } = require('chai');

describe('Sample file test', () => {
  context('Sample function', () => {
    it('shoud add numbers', () => {
      expect(2).to.equal(1 + 1);
    });
  });
});
