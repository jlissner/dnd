const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const routes = require('./routes')(app);

const port = process.env.PORT || 8080;

app.use('/', routes);

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfigFactory = require('./config/webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = webpackConfigFactory(process.env.NODE_ENV)
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}


app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

module.exports = app;
