const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const characterRoutes = require('./character');
const queryRoutes = require('./query');
const userRoutes = require('./user');

router.get('/ping', function (req, res) {
  res.send('pong');
});

router.use('/auth', authRoutes);
router.use('/character', characterRoutes);
router.use('/query', queryRoutes);
router.use('/user', userRoutes);

module.exports = router;
