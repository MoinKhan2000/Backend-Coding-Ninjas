import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import connectToDB from './config/connectToDB.js';
import ChatModel from './features/chat/chat.schema.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

let onlineUsers = new Map(); // Tracks users and their socket IDs

// Handle Socket events
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle new_user event
  socket.on('new_user', async ({ userName, profilePic }) => {
    socket.userName = userName;
    socket.profilePic = profilePic;
    onlineUsers.set(socket.id, { userName, profilePic });

    // Emit the list of online users to all connected clients
    io.emit('online_users', Array.from(onlineUsers.values()));
    console.log(Array.from(onlineUsers.values()));

    socket.broadcast.emit('new_user', { userName, profilePic });

    // Load recent messages
    try {
      const messages = await ChatModel.find().sort({ timeStamps: -1 }).limit(50);
      socket.emit('load_chat', messages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  });

  // Handle new_message event
  socket.on('new_message', async ({ message, room }) => {
    const userMessage = {
      sender: socket.userName,
      profilePic: socket.profilePic,
      message: message,
      room: room,
      createdAt: new Date(),
    };
    console.log(userMessage);

    try {
      const newChat = new ChatModel(userMessage);
      await newChat.save();

      io.in(room).emit('message_received', userMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle typing indicator
  socket.on('typing', (room) => {
    socket.to(room).emit('typing', { userName: socket.userName });
  });

  // Join a specific room
  socket.on('join_room', async (room) => {
    socket.join(room);

    try {
      const messages = await ChatModel.find({ room }).sort({ timeStamps: 1 }).limit(50);
      socket.emit('load_chat', messages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    onlineUsers.delete(socket.id);
    io.emit('online_users', Array.from(onlineUsers.values()));
    console.log('Client disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  connectToDB();
});
