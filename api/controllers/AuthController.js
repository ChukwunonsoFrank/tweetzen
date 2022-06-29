/** Auth controllers */

const redirectUserToDashboard = (req, res) => {
    const loggedInUsername = req.user.username
    res.redirect(`/${loggedInUsername}`)
}

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      throw new Error(err)
    }
    res.redirect('/')
  })
}

module.exports = {
    redirectUserToDashboard,
    logout
}
