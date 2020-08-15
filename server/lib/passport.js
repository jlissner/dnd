const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./pg');
const { callGraphql } = require('./graphql');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://lvh.me/auth/google/callback',
  },
  function(accessToken, refreshToken, profile, cb) {
    const { id, displayName, emails } = profile;
    const parsedEmails = emails
      .filter(email => email.verified)
      .map(email => `"${email.value}"`)
      .join(',');
    const createUserIfNotExistsQuery = `
      INSERT INTO app.users(google_id, name, emails)
      VALUES (${id}, '${displayName}', '{${emails}}')
      ON CONFLICT DO NOTHING;
    `;

    pool.query(createUserIfNotExistsQuery, (err) => {
      cb(err, id)
    });
  }
));

passport.serializeUser((id, cb) => {
  cb(null, id)
});

passport.deserializeUser((id, cb) => {
  const selectUserQuery = `{
    userByGoogleId(googleId: "${id}") {
      idPk
      name
      characters {
        nodes {
          idPk
          name
        }
      }
    }
  }`;

  callGraphql(selectUserQuery).then(({ userByGoogleId }) => {
    const user = {
      ...userByGoogleId,
      characters: userByGoogleId.characters.nodes
    }

    cb(null, user);
  });
});

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
}
