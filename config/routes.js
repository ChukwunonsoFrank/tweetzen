const express = require('express')
const router = express.Router()

// Controllers
const IndexController = require('../api/controllers/IndexController')

// Index routes
router.get('/', IndexController.view_homepage)

module.exports = router