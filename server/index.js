const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

app.use(require('cookie-parser')());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

require('express-ws')(app); // needs to happen before routes
require('./lib/passport')(app);


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

app.use(require('./routes'))
app.use(express.static(path.resolve('./build')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./build/index.html'));
});

module.exports = app;
