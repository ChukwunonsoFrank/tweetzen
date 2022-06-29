const viewDashboard = (req, res) => {
    if (req.user) {
        res.render('pages/user/dashboard', {
            user: req.user
        })
    } else {
        res.render('pages/user/dashboard', {
            user: {
                username: 'none'
            }
        })
    }
}

module.exports = {
    viewDashboard
}