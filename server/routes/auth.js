const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { accessType: 'offline', scope: ['openid'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req);
    // Successful authentication, redirect home.

    res.redirect('/');
  });

module.exports = router;
