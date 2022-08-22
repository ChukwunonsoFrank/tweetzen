const express = require('express')
const router = express.Router()
const passport = require('passport')

const IndexController = require('../api/controllers/IndexController')
const AuthController = require('../api/controllers/AuthController')
const UserController = require('../api/controllers/UserController')

router.get('/', IndexController.viewHomepage)
router.get('/:username', UserController.viewDashboard)

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/',
}), AuthController.redirectUserToDashboard)
router.get('/tweet/id', UserController.searchForCreatorNameInFollowingList)
router.get('/user/creator/add', UserController.addCreatorToFeed)

router.get('/auth/twitter/login', passport.authenticate('twitter'))
router.get('/logout', AuthController.logout)

module.exports = router
