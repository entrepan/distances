const { describe, it, expect } = require('@entrepan/core');
const { hamming } = require('../lib');

describe('Hamming distance', () => {
  it('should handle exact matches', () => {
    expect(hamming('john', 'john')).toEqual(0);
  });
  it('should handle distances without normalization', () => {
    expect(hamming('karolin', 'kathrin')).toEqual(3);
    expect(hamming('karolin', 'kerstin')).toEqual(3);
    expect(hamming('1011101', '1001001')).toEqual(2);
    expect(hamming('2173896', '2233796')).toEqual(3);
    expect(hamming('different', 'length')).toEqual(-1);
  });
  it('should handle distances with normalization', () => {
    expect(hamming('karolin', 'Kathrin', true)).toEqual(3);
    expect(hamming('karolin', 'Kerstin', true)).toEqual(3);
    expect(hamming('ignorecase', 'IgnoreCase', true)).toEqual(0);
  });
});
