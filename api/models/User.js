const Sequelize = require('sequelize')
const db = require('../../config/datastore')

const User = db.define('user', {
    twitter_id: {
        type: Sequelize.INTEGER,
    },
    username: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    profile_img_url: {
        type: Sequelize.STRING
    },
    verified: {
        type: Sequelize.BOOLEAN
    },
})

module.exports = User