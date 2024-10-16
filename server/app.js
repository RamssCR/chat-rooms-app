import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { PORT } from './config.js'

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

const rooms = {}

app.use(cors({ origin: 'http://localhost:5173' }))

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
    })

    // <---- USER WELCOME MESSAGES ---->
    // Welcoming the user joined
    socket.emit('dialog message', 'Welcome to ChatMong!')

    // Broadcasting to all users
    socket.broadcast.emit('dialog message', 'A new user has joined the room')
    // <---- USER WELCOME MESSAGES ---->

    socket.on('sent message', ({ body, room, username, time }) => socket.to(room).emit('received message', {body, username, time}))

    // A user leaves the room by clicking on exit
    socket.on('leave', () => {
        for (const room in rooms) {
            rooms[room] = rooms[room].filter(user => user.id !== socket.id)
            
            io.to(room).emit('users', rooms[room])
            io.to(room).emit('dialog message', 'An user just left the room')
        }
    })

    // A user leaves the room
    socket.on('disconnect', () => {
        for (const room in rooms) {
            rooms[room] = rooms[room].filter(user => user.id !== socket.id)
            
            io.to(room).emit('users', rooms[room])
            io.to(room).emit('dialog message', 'An user just left the room')
        }
    })
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))