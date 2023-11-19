const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
require('dotenv').config()

const userRoute = require('../routes/user.route')
const {saveMessage, getAllMessages} = require("../monodb_methods/message.methods");
const {getUserById} = require("../monodb_methods/user.methods");

require('./db').db
    .then(() => {
        console.log('Connected to db successfully')
    })
    .catch((error) => {
        console.error(`An error has occurred: ${error.message}`)
    })

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors())
app.use('/api', userRoute)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

global.sockets = new Map()

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('add-user', ({userId}) => {
        sockets.set(userId, socket.id)
        getUserById(userId)
            .then((user) => {
                socket.broadcast.emit('new-user', {user})
            })
            .catch(err => console.log(err))
    })

    socket.on('get_all_messages', (data) => {
        getAllMessages(data)
            .then((messages) => {
                socket.emit('all_messages', messages)
            })
    })

    socket.on('send_message', ({message, to, from}) => {
        const receiver = sockets.get(to)
        saveMessage(message).then().catch((err) => console.log(err))
        if (receiver) {
            socket.to(receiver).emit('receive_message', {message, from: from})
        }
    })

    socket.on('disconnect-user', ({userId}) => {
        sockets.delete(userId)
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`)
    })
})

server.listen(process.env.PORT,() => {
    console.log('Server started on port:', process.env.PORT)
})