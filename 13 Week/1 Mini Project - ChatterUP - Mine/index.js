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

let onlineUsers = new Map(); // Use a Map to track users and their socket IDs

// Handle Socket events
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle new_user event
  socket.on('new_user', (userName) => {
    socket.userName = userName;
    onlineUsers.set(socket.id, userName);

    // Emit the list of online users to all connected clients
    io.emit('online_users', Array.from(onlineUsers.values()));

    // Broadcast that a new user has joined
    socket.broadcast.emit('new_user', socket.userName);
  });

  // Handle new_message event
  socket.on('new_message', async ({ message, room, receiver }) => {
    const userMessage = {
      sender: socket.userName,
      message: message,
      receiver: receiver,
      room: room,
    };
    console.log(userMessage);

    try {
      // Save the message to the database
      const newChat = new ChatModel(userMessage);
      await newChat.save();

      // Emit the message to everyone in the room, including the sender
      io.in(room).emit('message_received', userMessage);

    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Join a specific room
  socket.on('join_room', async (room) => {
    console.log(`${socket.userName} joined room: ${room}`);
    socket.join(room);

    try {
      // Load chat history for the room
      const messages = await ChatModel.find({ room }).sort({ timeStamps: 1 }).limit(50);
      socket.emit('load_chat', messages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  });

  // Leave the room when switching
  socket.on('leave_room', (room) => {
    console.log(`${socket.userName} left room: ${room}`);
    socket.leave(room);
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
