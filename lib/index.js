const leven = require('./leven');
const similarity = require('./similarity');
const cosineSimilarity = require('./cosine-similarity');
const spellCheck = require('./spell-check');
const diceCoefficient = require('./dice-coefficient');
const hamming = require('./hamming');
const jaroWinkler = require('./jaro-winkler');

module.exports = {
  ...leven,
  ...similarity,
  ...cosineSimilarity,
  ...spellCheck,
  ...diceCoefficient,
  ...hamming,
  ...jaroWinkler,
};
