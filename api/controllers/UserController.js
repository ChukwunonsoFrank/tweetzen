const req = require('express/lib/request')
const { Client } = require('twitter-api-sdk')
const client = new Client(process.env.TWITTER_BEARER_TOKEN)
const Favourite = require('../models/Favourite')

exports.viewDashboard = (req, res) => {
    if (req.user) {
        res.render('pages/user/dashboard', {
            user: req.user
        })
    } else {
        res.redirect('/')
    }
}

exports.getTweetByID = async (req, res) => {
    const user = await client.users.findUserByUsername('elonmusk', {
        "user.fields": ["name", "profile_image_url", "username", "verified"]
    })
    res.json(user)
}

exports.addCreatorToFeed = async (req, res) => {
    const { id } = req.query
    await Favourite.create({
        favourites_twitter_id: id,
        userId: req.session.userID
    })
}

async function removeUsersAlreadyInFavouritesList(req, matchedUsers) {
    const favourites = await Favourite.findAll({
        where: {
            userId: req.session.userID
        }
    })
    const favouritesTwitterIDs = favourites.map(favourite => favourite.favourites_twitter_id)
    const matchedUsersTwitterIDs = matchedUsers.map(user => user.id)
    const matchedUsersTwitterIDsWithoutFavourites = []
    for(const id of matchedUsersTwitterIDs) {
        if(favouritesTwitterIDs.includes(id)) {
            continue
        }
        matchedUsersTwitterIDsWithoutFavourites.push(id)
    }
    const notInFavouritesList = []
    for(const id of matchedUsersTwitterIDsWithoutFavourites) {
        const matchedUserWithTwitterID = matchedUsers.find(user => user.id === id)
        notInFavouritesList.push(matchedUserWithTwitterID)
    }
    return notInFavouritesList
}

exports.searchForCreatorNameInFollowingList = async (req, res) => {
    let searchString = req.query.search_string
    
    async function getUsersFollowedByLoggedInUser (loggedInUserID) {
        const following = await client.users.usersIdFollowing(loggedInUserID, {
            max_results: 1000,
            "user.fields": ['id', 'profile_image_url', 'name', 'username']
        })
        return following
    }
    const { data } = await getUsersFollowedByLoggedInUser('908614625171836929')
    let usersFollowedByLoggedInUserThatMatch = data.filter(following => {
        if (searchString.length === 0) {
            return []
        } else {
            const regex = new RegExp(`^${searchString}`, 'gi')
            return following.name.match(regex) || following.username.match(regex)
        }
    })
    const payload = await removeUsersAlreadyInFavouritesList(req, usersFollowedByLoggedInUserThatMatch)
    res.json(payload)
}