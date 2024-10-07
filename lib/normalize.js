const normalize = (str) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/g, '')
    .toLowerCase();

module.exports = { normalize };
