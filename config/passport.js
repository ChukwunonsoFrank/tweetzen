const TwitterStrategy = require('passport-twitter').Strategy

/** Passport Setup */
function passportConfig(passport) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET_KEY,
        callbackURL: 'http://localhost:1337/auth/twitter/callback',
      },
      function (token, tokenSecret, profile, cb) {
        return cb(null, profile)
      }
    )
  )

  passport.serializeUser((user, callback) => callback(null, user))
  passport.deserializeUser((obj, callback) => callback(null, obj))
}

module.exports = passportConfig
