const UserModel = require('../models/user.model')

const saveUser = (username) => {
    return new Promise((resolve, reject) => {
        UserModel.create({
            username: username
        })
            .then(() => resolve(`${username} add to DB`))
            .catch(err => reject(err))
    })
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.find({})
            .then(users => resolve(users))
            .catch(err => reject(err))
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        UserModel.findById(id)
            .then(user => resolve({id: user._id, username: user.username}))
            .catch(err => reject(err))
    })
}

module.exports = {saveUser, getAllUsers, getUserById}