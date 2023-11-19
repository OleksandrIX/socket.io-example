const {saveUser, getAllUsers} = require('../monodb_methods/user.methods')

module.exports.connect = async (reg, res, next) => {
    try {
        const {username} = await reg.body
        saveUser(username).then((res) => console.log(res)).catch((err) => console.log(err))
        return res.json({status: true,})
    } catch (err) {
        next(err)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers()
        for (let i = 0; i < users.length; i++) {
            users[i] = {'id': users[i]._id, 'username': users[i].username, 'socketId': users[i].socketId}
        }
        return res.json({users})
    } catch (err) {
        next(err)
    }
}