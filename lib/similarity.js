const { leven } = require('./leven');
const { normalize } = require('./normalize');

function similarity(str1, str2, shouldNormalize = false) {
  if (shouldNormalize) {
    const fn = shouldNormalize === true ? normalize : shouldNormalize;
    // eslint-disable-next-line no-param-reassign
    str1 = fn(str1);
    // eslint-disable-next-line no-param-reassign
    str2 = fn(str2);
  }
  return str1 === str2 ? 0 : leven(str1, str2);
}

module.exports = { similarity };
