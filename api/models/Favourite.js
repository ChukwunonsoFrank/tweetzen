const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:hermit0910@127.0.0.1:5432/tweetzen')

const Favourite = sequelize.define('favourites', {
    favourites_twitter_id: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER
    }
})

module.exports = Favourite