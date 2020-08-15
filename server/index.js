const express = require('express');
const app = express();
const path = require('path');
const initWs = require('express-ws');
const {
  initPassport,
  initSession,
} = require('./lib');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

initSession(app)
initWs(app); // needs to happen before routes
initPassport(app);

app.use(require('./routes'))

if (process.env.NODE_ENV !== 'production') {
  const history = require('connect-history-api-fallback');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../config/webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(history()); // allows for routes besides root to work
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(path.resolve('./server/build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('./server/build/index.html'));
  });
}


module.exports = app;
