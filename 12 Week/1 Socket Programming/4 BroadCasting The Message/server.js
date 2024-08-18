import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import http from 'http'

const app = express()

// 1. Create server using http.
const server = http.createServer(app)

// 2. Create socket server.
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

// 3. Handle Socket event.
io.on('connection', (socket) => {
  console.log('Client connected')

  // Handle new_message event. When a new message is received, broadcast it to all the users.
  socket.on('new_message', (message) => {
    // Broadcast the message to all the users.
    socket.broadcast.emit('broadcast_message', message)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

let port = 3000
server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
})