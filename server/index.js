const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const initWs = require('express-ws');
const {
  initPassport,
  initSession,
} = require('./lib');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

initSession(app)
initWs(app); // needs to happen before routes
initPassport(app);

app.use(require('./routes'))
app.use(express.static(path.resolve('./server/build')));

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfigFactory = require('../config/webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = webpackConfigFactory(process.env.NODE_ENV)
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./server/build/index.html'));
});

module.exports = app;
