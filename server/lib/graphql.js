const _reduce = require('lodash/reduce');
const _trimStart = require('lodash/trimStart');

function objToGraphqlStr(obj) {
  function arrToGraphqlStr(arr) {
    const mappedVals = arr.map(val => {
      const isArr = val instanceof Array;
      const isObj = typeof val === 'object';

      if (isArr) {
        return arrToGraphqlStr(val);
      }

      return isObj
        ? `{${objToGraphqlStr(val)}}`
        : JSON.stringify(val);

    });
    
    return `[${mappedVals.join(', ')}]`
  }

  const str = _reduce(obj, (cur, val, key) => {
    const isNull = val === null || val === undefined;
    const isArr = val instanceof Array;
    const isObj = typeof val === 'object';

    if (isNull) {
      return `${cur}, ${key}: null`
    }

    if (isArr) {
      return `${cur}, ${key}: ${arrToGraphqlStr(val)}`
    }

    return isObj
      ? `${cur}, ${key}: {${objToGraphqlStr(val)}}`
      : `${cur}, ${key}: ${JSON.stringify(val)}`;
  }, '');
  
  return _trimStart(str, ', ');
}

module.exports = {
  objToGraphqlStr,
}