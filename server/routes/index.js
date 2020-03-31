const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const characterRoutes = require('./character');
const postgraphileRoutes = require('./postgraphile');
const userRoutes = require('./user');

router.get('/ping', function (req, res) {
  res.send('pong');
});

router.use('/auth', authRoutes);
router.use('/character', characterRoutes);
router.use('/query', postgraphileRoutes);
router.use('/user', userRoutes);

module.exports = router;
