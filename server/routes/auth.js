const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { accessType: 'offline', scope: ['openid'] }));
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/',
}));

module.exports = router;
