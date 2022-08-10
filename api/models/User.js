const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:hermit0910@127.0.0.1:5432/tweetzen')

const User = sequelize.define('User', {
    twitter_id: {
        type: DataTypes.INTEGER,
    },
    username: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    profile_img_url: {
        type: DataTypes.STRING
    },
    verified: {
        type: DataTypes.BOOLEAN
    },
})

module.exports = User