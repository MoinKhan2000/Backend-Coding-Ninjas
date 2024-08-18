import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import http from 'http'
import { connectToDB } from './config.js'
import ChatModel from './chat.schema.js'

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


  // Handle the UserName event
  socket.on('new_user', (userInfo) => {
    socket.userName = userInfo

    // Get Old Messages to Show in the UI
    ChatModel.find().sort({ timeStamps: 1 }).limit(50)
      .then(message => {
        socket.emit('load_messages', message)
      })
      .catch(error => {
        console.log(error);
      })

    // Broadcast the new user's name to all the connected users.
    io.emit('new_user', socket.userName)
  })

  // Handle new_message event. When a new message is received, broadcast it to all the users.
  socket.on('new_message', (message) => {
    // Broadcast the message to all the users.
    let userMessage = {
      userName: socket.userName,
      message: message,
    }

    const newChat = new ChatModel(userMessage)
    newChat.save()
    socket.broadcast.emit('broadcast_message', userMessage)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

let port = 3000
server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
  connectToDB() // Connect to MongoDB database.
})