const { normalize } = require('./normalize');

function hamming(a, b, shouldNormalize = false) {
  if (shouldNormalize) {
    const fn = shouldNormalize === true ? normalize : shouldNormalize;
    // eslint-disable-next-line no-param-reassign
    a = fn(a);
    // eslint-disable-next-line no-param-reassign
    b = fn(b);
  }
  if (a.length !== b.length) {
    return -1;
  }
  let diffs = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      diffs += 1;
    }
  }
  return diffs;
}

module.exports = { hamming };
