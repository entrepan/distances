const { normalize } = require('./normalize');

function jaro(a, b, shouldNormalize = false) {
  if (shouldNormalize) {
    const fn = shouldNormalize === true ? normalize : shouldNormalize;
    // eslint-disable-next-line no-param-reassign
    a = fn(a);
    // eslint-disable-next-line no-param-reassign
    b = fn(b);
  }
  if (a.length === 0 || b.length === 0) {
    return 0;
  }
  const matchWindow = Math.floor(Math.max(a.length, b.length) / 2.0) - 1;
  const ma = new Array(a.length);
  const mb = new Array(b.length);
  let m = 0;
  let t = 0;
  for (let i = 0; i < a.length; i += 1) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, b.length);
    for (let k = start; k < end; k += 1) {
      if (!mb[k] && a[i] === b[k]) {
        ma[i] = true;
        mb[k] = true;
        m += 1;
        break;
      }
    }
  }
  if (m === 0) {
    return 0.0;
  }
  let k = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (ma[i]) {
      while (!mb[k]) {
        k += 1;
      }
      if (a[i] !== b[k]) {
        t += 1;
      }
      k += 1;
    }
  }
  return (m / a.length + m / b.length + (m - t / 2) / m) / 3.0;
}

function jaroWinkler(a, b, shouldNormalize = false, preJaro = undefined) {
  if (shouldNormalize) {
    const fn = shouldNormalize === true ? normalize : shouldNormalize;
    // eslint-disable-next-line no-param-reassign
    a = fn(a);
    // eslint-disable-next-line no-param-reassign
    b = fn(b);
  }
  const jaroValue = preJaro ?? jaro(a, b);
  let l = 0;
  while (a[l] === b[l] && l < 4) {
    l += 1;
  }
  return jaroValue + l * 0.1 * (1 - jaroValue);
}

module.exports = { jaro, jaroWinkler };
