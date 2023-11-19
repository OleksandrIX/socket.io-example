const MessageModel = require('../models/message.model')

function saveMessage(message) {
    return new Promise((resolve, reject) => {
        MessageModel.create({
            sender: message.sender, receiver: message.receiver, dateSend: message.dateSend, message: message.message,
        })
            .then(() => resolve('Save msg'))
            .catch(err => reject(err))
    })
}

async function getAllMessages({sender, receiver}) {
    let allMessages = []

    const getSenderMsg = new Promise(async (resolve, reject) => {
        try {
            const messages = await MessageModel.find({})
                .where('sender').equals(sender)
                .where('receiver').equals(receiver)
            resolve(messages)
        } catch (err) {
            reject(err)
        }
    })

    const getReceiverMsg = new Promise(async (resolve, reject) => {
        try {
            const messages = await MessageModel.find({})
                .where('sender').equals(receiver)
                .where('receiver').equals(sender)
            resolve(messages)
        } catch (err) {
            reject(err)
        }
    })

    await Promise.all([getSenderMsg, getReceiverMsg])
        .then(data => {
            allMessages = data
        })
        .catch(err => {
            allMessages = err
        })

    return allMessages
}

module.exports = {saveMessage, getAllMessages}