const postgraphileRoutes = require('./postgraphile');
const characterRoutes = require('./character');

module.exports = app => {
  app.get('/ping', function (req, res) {
   res.send('pong');
  });

  app.use('/', postgraphileRoutes);
  app.use('/character', characterRoutes(app));
};
