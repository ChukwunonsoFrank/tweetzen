const User = require('../models/User')

exports.redirectUserToDashboard = async (req, res) => {
    const loggedInUsername = req.user.username
    const userInfoFromDB = await User.findOne({
      where: {
        username: loggedInUsername,
      },
    })
    req.session.userID = userInfoFromDB.dataValues.id
    res.redirect(`/${loggedInUsername}`)
}

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      throw new Error(err)
    }
    res.redirect('/')
  })
}
