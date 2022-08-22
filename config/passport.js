const TwitterStrategy = require('passport-twitter').Strategy
const User = require('../api/models/User')

async function registerUser(twId, twUsername, twDisplayName, twPhoto, isVerified) {
  try {
    const user = await User.create({
      twitter_id: twId,
      username: twUsername,
      profile_image_url: twPhoto,
      name: twDisplayName,
      verified: isVerified,
    })

   } catch (error) {
     console.log('Unable to create a user', error)
   }
   return cb(null, profile)
}

function passportConfig(passport) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET_KEY,
        callbackURL: 'http://localhost:1337/auth/twitter/callback',
        passReqToCallback: true
      },
      async function (req, token, tokenSecret, profile, cb) {
        const { id, username, displayName, photos, _json } = profile
        const existingUser = await User.findOne({
          where: {
            twitter_id: id,
          },
        })
        if (existingUser) {
          return cb(null, profile)
        }
        registerUser(id, username, displayName, photos[0].value, _json.verified)
      }
    )
  )
  passport.serializeUser((user, callback) => callback(null, user))
  passport.deserializeUser((obj, callback) => callback(null, obj))
}

module.exports = passportConfig
