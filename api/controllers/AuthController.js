/** Auth controllers */

const redirectUserToDashboard = (req, res) => {
    const loggedInUsername = req.user.username
    console.log(req.session)
    res.redirect(`/${loggedInUsername}`)
}

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      throw new Error(err)
    }
    res.redirect('/')
  })
  console.log(req.session)
}

module.exports = {
    redirectUserToDashboard,
    logout
}
