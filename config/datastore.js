const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('tweetzen', 'postgres', 'hermit0910', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = async function () {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}


