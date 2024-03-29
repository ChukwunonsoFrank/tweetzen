const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:hermit0910@127.0.0.1:5432/tweetzen')
const Favourite = require('./Favourite')

const User = sequelize.define('users', {
    twitter_id: {
        type: DataTypes.INTEGER,
    },
    username: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    profile_image_url: {
        type: DataTypes.STRING
    },
    verified: {
        type: DataTypes.BOOLEAN
    },
})

User.hasMany(Favourite)
Favourite.belongsTo(User)

module.exports = User