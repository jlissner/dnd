const { pool } = require('./db');
const { graphql } = require('graphql');
const { watchPostGraphileSchema, withPostGraphileContext } = require('postgraphile');
const postgraphileConfig = require('../../config/postgraphile');
const _reduce = require('lodash/reduce');
const _trimStart = require('lodash/trimStart');

const graphqlConfig = {
  schema: null,
  releaseWatcher: null,
};

async function init() {
  const releaseWatcher = await watchPostGraphileSchema(
    pool,
    ['app'],
    postgraphileConfig,
    schema => {
      graphqlConfig.schema = schema;
    },
  );

  graphqlConfig.releaseWatcher = releaseWatcher;
}

init();

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

function callGraphql(query) {
  const { schema } = graphqlConfig;

  if (!schema) {
    throw new Error('Still setting up shema');
  }

  return new Promise((res, rej) => {
    withPostGraphileContext({ pgPool: pool }, async (context) => {
      const { data, errors } = await graphql(schema, query, {}, context);

      if (errors) {
        rej(errors);
      } else {
        res(data);
      }
    });
  })
}

module.exports = {
  objToGraphqlStr,
  callGraphql,
  graphqlConfig,
}