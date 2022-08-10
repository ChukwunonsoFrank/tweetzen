const TwitterStrategy = require('passport-twitter').Strategy
const User = require('../api/models/User')

/** Passport Setup */
function passportConfig(passport) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET_KEY,
        callbackURL: 'http://localhost:1337/auth/twitter/callback',
      },
      async function (token, tokenSecret, profile, cb) {
        const { id, username, displayName, photos, _json } = profile
        const existingUser = await User.findOne({
          where: {
            twitter_id: id,
          },
        })

        if (existingUser) {
          return cb(null, profile)
        }

       try {
        await User.create({
          twitter_id: id,
          username,
          profile_image_url: photos[0].value,
          name: displayName,
          verified: _json.verified,
        })
       } catch (error) {
         console.log('Unable to create a user', error)
       }

        return cb(null, profile)
      }
    )
  )

  passport.serializeUser((user, callback) => callback(null, user))
  passport.deserializeUser((obj, callback) => callback(null, obj))
}

module.exports = passportConfig
