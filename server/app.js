import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { PORT } from './config.js'

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: 'https://chatmong-rc.onrender.com'
    }
})

const rooms = {}

app.get('/', (req, res) => {
    res.json({
        message: 'Socket.io chat backend working perfectly',
        status: 'PRODUCTION'
    })
})

io.on('connection', socket => {
    socket.on('join', user => {
        const { username, room } = user
        if (!rooms[room]) rooms[room] = []

        const userConfig = {
            id: socket.id,
            username
        }

        rooms[room].push(userConfig)

        socket.join(room)
        io.to(room).emit('users', rooms[room])

        socket.emit('dialog message', 'Welcome to ChatMong!')    
        socket.to(room).emit('dialog message', `A new user has joined the room ${room}`)
    })


    socket.on('sent message', ({ body, room, username, time }) => socket.to(room).emit('received message', {body, username, time}))

    // A user leaves the room by clicking on exit
    socket.on('leave', () => {
        for (const room in rooms) {
            rooms[room] = rooms[room].filter(user => user.id !== socket.id)
            
            socket.leave(room)

            io.to(room).emit('users', rooms[room])
            socket.to(room).emit('dialog message', 'An user just left the room')
        }
    })

    // A user leaves the room
    socket.on('disconnect', () => {
        for (const room in rooms) {
            rooms[room] = rooms[room].filter(user => user.id !== socket.id)

            socket.leave(room)
            
            io.to(room).emit('users', rooms[room])
            socket.to(room).emit('dialog message', 'An user just left the room')
        }
    })
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))