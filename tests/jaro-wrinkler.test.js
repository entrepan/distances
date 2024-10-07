const { describe, it, expect } = require('@entrepan/core');
const { jaroWinkler } = require('../lib');

describe('Jaro-Winkler', () => {
  it('should evaluate string similarity', () => {
    expect(jaroWinkler('DIXON', 'DICKSONX')).toBeCloseTo(0.81333);
    expect(jaroWinkler('DWAYNE', 'DUANE')).toBeCloseTo(0.84);
    expect(jaroWinkler('RICK', 'RICK')).toEqual(1);
    expect(jaroWinkler('abc', 'abc')).toEqual(1);
    expect(jaroWinkler('abcd', 'abcd')).toEqual(1);
    expect(jaroWinkler('seddon', 'seddon')).toEqual(1);
    expect(jaroWinkler('NOT', 'SAME')).toEqual(0);
    expect(jaroWinkler('aaa', 'abcd')).toBeCloseTo(0.575);
    expect(jaroWinkler('MARTHA', 'MARHTA')).toBeCloseTo(0.96111);
    expect(jaroWinkler('aaa', 'aAa')).toBeCloseTo(0.8);
  });
  it('should handle transpositions regardless of string order', () => {
    expect(jaroWinkler('class', 'clams')).toBeCloseTo(0.90666);
    expect(jaroWinkler('clams', 'class')).toBeCloseTo(0.90666);
  });
  it('should handle normalization', () => {
    expect(jaroWinkler('aaa', 'aAa', true)).toEqual(1);
    expect(jaroWinkler('MARTHA', 'maRhTa', true)).toBeCloseTo(0.96111);
  });
});
