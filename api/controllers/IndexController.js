const viewHomepage = (req, res) => {
    if (req.user) {
        res.render('pages/homepage', {
            user: req.user
        })
    } else {
        res.render('pages/homepage', {
            user: {
                username: 'none'
            }
        })
    }
}

module.exports = {
    viewHomepage
}