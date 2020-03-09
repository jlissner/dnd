const express = require('express');
const router = express.Router();
const postgraphileRoutes = require('./postgraphile');
const characterRoutes = require('./character');

router.get('/ping', function (req, res) {
  res.send('pong');
});

router.use('/', postgraphileRoutes);
router.use('/character', characterRoutes);

module.exports = router;
