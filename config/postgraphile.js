const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");

const npConfig = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: true,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [ConnectionFilterPlugin, require("@graphile-contrib/pg-simplify-inflector")],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    // TODO: customise condition!
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: "omit",
  pgSettings(req) {
    /* TODO */
  },
};

const prodConfig = {
  subscriptions: true,
  retryOnInitFail: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: true,
  extendedErrors: ["errcode"],
  appendPlugins: [ConnectionFilterPlugin, require("@graphile-contrib/pg-simplify-inflector")],
  graphiql: false,
  enableQueryBatching: true,
  disableQueryLog: true, // our default logging has performance issues, but do make sure you have a logging system in place!
  legacyRelations: "omit",
  pgSettings(req) {
    /* TODO */
  },
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : npConfig;

module.exports = config;
