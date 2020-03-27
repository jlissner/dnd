const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://lvh.me/auth/google/callback',
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('id', profile);
    cb(null, profile.id );
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

passport.serializeUser((id, cb) => {
  cb(null, id)
});

passport.deserializeUser((id, cb) => {
//   db.query('SELECT id, username, type FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
//     if(err) {
//       winston.error('Error when selecting user on session deserialize', err)
//       return cb(err)
//     }
//
//     cb(null, results.rows[0])
//   })
  cb(null, id)
});

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
}
