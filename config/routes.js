const express = require('express')
const router = express.Router()
const passport = require('passport')

// Import controllers
const IndexController = require('../api/controllers/IndexController')
const AuthController = require('../api/controllers/AuthController')
const UserController = require('../api/controllers/UserController')

// Index routes
router.get('/', IndexController.viewHomepage)

// Auth routes
router.get('/auth/twitter/login', passport.authenticate('twitter'))
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/',
}), AuthController.redirectUserToDashboard)
router.get('/logout', AuthController.logout)

// User routes
router.get('/:username', UserController.viewDashboard)
router.get('/tweet/id', UserController.searchForCreatorNameInFollowingList)

module.exports = router
