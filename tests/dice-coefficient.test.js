const { describe, it, expect } = require('@entrepan/core');
const { diceCoefficient } = require('../lib');
const { text: text1 } = require('./Wikipedia_EN_FrenchRevolution.json');
const { text: text2 } = require('./Wikipedia_EN_InfluenceOfTheFrenchRevolution.json');

describe('Dice coefficient', () => {
  it('Should handle exact matches', () => {
    expect(diceCoefficient('john', 'john')).toEqual(1);
  });
  it('Should match single character words', () => {
    expect(diceCoefficient('a', 'a')).toEqual(1);
    expect(diceCoefficient('a', 'b')).toEqual(0);
  });
  it('Should handle total mis-matches', () => {
    expect(diceCoefficient('john', 'matt')).toEqual(0);
  });
  it('should handle a typical case', () => {
    expect(diceCoefficient('night', 'nacht')).toEqual(0.25);
  });
  it('should normalize if requested', () => {
    expect(diceCoefficient('night', 'NIGHT', true)).toEqual(1);
  });
  it('should normalize spacing', () => {
    expect(diceCoefficient('the   space', 'the space', true)).toEqual(1);
  });
  it(
    ('should compare complete texts',
    () => {
      expect(diceCoefficient(text1, text2)).toBe(0.7544430538172716);
      expect(diceCoefficient(text1, text2, true)).toBe(0.8034643570952699);
    })
  );
});
