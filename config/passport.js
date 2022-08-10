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
      function (token, tokenSecret, profile, cb) {
        const { id, username, displayName, photos, _json } = profile
        // let doesUserAlreadyExist = null
        // User.findOne({
        //   where: {
        //     twitter_id: id,
        //   },
        // })
        // .then((user) => {
        //   if (user && user.twitter_id === id) {
        //     doesUserAlreadyExist = true
        //   }
        // })
        // .catch((err) => console.log(err))
        // console.log(doesUserAlreadyExist)
        
        // User.create({
        //   twitter_id: id,
        //   username,
        //   profile_img_url: photos[0].value,
        //   name: displayName,
        //   verified: _json.verified,
        // }).then(user => console.log(user))
        //   .catch(err => console.log(err))

        return cb(null, profile)
      }
    )
  )

  passport.serializeUser((user, callback) => callback(null, user))
  passport.deserializeUser((obj, callback) => callback(null, obj))
}

module.exports = passportConfig
