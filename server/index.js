const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const initWs = require('express-ws');
const initPassport = require('./lib/passport');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  name: '_redisPractice',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}));

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
