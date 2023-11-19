const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    sender:{
        type: String,
    },
    receiver:{
        type: String,
    },
    dateSend:{
        type: String,
    },
    message: {
        type: String
    }
})

module.exports = mongoose.model('message', MessageSchema)