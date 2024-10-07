const { describe, it, expect } = require('@entrepan/core');
const { SpellCheck } = require('../lib');

describe('Similar Search', () => {
  describe('Constructor', () => {
    it('An instance can be created', () => {
      const spellCheck = new SpellCheck({
        features: { word: 1, more: 1, other: 2 },
      });
      expect(spellCheck).toBeDefined();
    });
  });

  describe('Set features', () => {
    it('Features can be changed with a method', () => {
      const spellCheck = new SpellCheck();
      spellCheck.setFeatures({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('word', 1);
      expect(actual).toEqual('word');
    });
  });

  describe('Check token', () => {
    it('If the token already exists, return the token', () => {
      const spellCheck = new SpellCheck({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('word', 1);
      expect(actual).toEqual('word');
    });
    it('If the token is smaller than 4 return then token', () => {
      const spellCheck = new SpellCheck({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('wor', 1);
      expect(actual).toEqual('wor');
    });
    it('If exists a similar feature, return this similar feature', () => {
      const spellCheck = new SpellCheck({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('world', 1);
      expect(actual).toEqual('word');
    });
    it('If not exists a similar feature, return this input token', () => {
      const spellCheck = new SpellCheck({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('mandate', 1);
      expect(actual).toEqual('mandate');
    });
    it('If there are several similar features, return the one with more similar length', () => {
      const spellCheck = new SpellCheck({
        features: {
          wording: 1,
          workin: 1,
          workingo: 1,
          other: 2,
        },
      });
      const actual = spellCheck.checkToken('working', 1);
      expect(actual).toEqual('wording');
    });
  });

  describe('Check', () => {
    it('Check allows to test several words', () => {
      const spellCheck = new SpellCheck({
        features: {
          wording: 1,
          working: 3,
          workin: 1,
          workingo: 1,
          other: 2,
        },
      });
      const actual = spellCheck.check(['this', 'is', 'worling', 'otler'], 1);
      expect(actual).toEqual(['this', 'is', 'working', 'other']);
    });
    it('By default, distance should be 1', () => {
      const spellCheck = new SpellCheck({
        features: {
          wording: 1,
          working: 3,
          workin: 1,
          workingo: 1,
          other: 2,
        },
      });
      const actual = spellCheck.check(['this', 'is', 'worling', 'otler']);
      expect(actual).toEqual(['this', 'is', 'working', 'other']);
    });
    it('It should choose the word with bigger frequency', () => {
      const spellCheck = new SpellCheck({
        features: {
          wording: 1,
          worming: 4,
          working: 3,
        },
      });
      const actual = spellCheck.check(['worling'], 1);
      expect(actual).toEqual(['worming']);
    });
  });
});
