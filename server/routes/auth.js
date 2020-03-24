const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/google', passport.authenticate('google', { scope: ['profile']}));
router.get('/google/callback',
  (err, req, res, next) => {
    console.log('here?');

    next();
  },
  passport.authenticate('google'),
  function(err, req, res, next) {
    console.log({ err })
    // Successful authentication, redirect home.

    res.redirect('/');
  });

// router.post('/google/callback', (req, res) => passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login', })(req, res));

module.exports = router;
