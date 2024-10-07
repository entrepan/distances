const { normalize } = require('./normalize');

function getBigrams(str) {
  const result = new Set();
  if (str.length === 1) {
    result.add(`${str} `);
    return result;
  }
  for (let i = 0; i < str.length - 1; i += 1) {
    result.add(str.slice(i, i + 2));
  }
  return result;
}

function intersect(a, b) {
  const result = new Set();
  a.forEach((value) => {
    if (b.has(value)) {
      result.add(value);
    }
  });
  return result;
}

function diceCoefficient(a, b, shouldNormalize = false) {
  if (shouldNormalize) {
    const fn = shouldNormalize === true ? normalize : shouldNormalize;
    // eslint-disable-next-line no-param-reassign
    a = fn(a);
    // eslint-disable-next-line no-param-reassign
    b = fn(b);
  }
  const bigrams1 = getBigrams(a);
  const bigrams2 = getBigrams(b);
  return (2 * intersect(bigrams1, bigrams2).size) / (bigrams1.size + bigrams2.size);
}

module.exports = { diceCoefficient };
