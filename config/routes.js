const express = require('express')
const router = express.Router()
const passport = require('passport')

// Import controllers
const IndexController = require('../api/controllers/IndexController')
const AuthController = require('../api/controllers/AuthController')

// Index routes
router.get('/', IndexController.viewHomepage)
router.get('/auth/twitter/login', passport.authenticate('twitter'))
router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/',
  }),
  AuthController.redirectUserToHomepage
)
router.get('/logout', AuthController.logout)

module.exports = router
