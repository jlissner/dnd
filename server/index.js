const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const initWs = require('express-ws');
const initPassport = require('./lib/passport');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

initWs(app); // needs to happen before routes
initPassport(app);

app.use(require('./routes'))
app.use(express.static(path.resolve('./build')));

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
  res.sendFile(path.resolve('./build/index.html'));
});

module.exports = app;
