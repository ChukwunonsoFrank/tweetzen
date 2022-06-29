/** Auth controllers */

const redirectUserToHomepage = (req, res) => {
    res.redirect('/')
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
    redirectUserToHomepage,
    logout
}
