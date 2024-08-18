import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Task from './task.schema.js';

const app = express();
app.use(cors());

export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'UPDATE', 'DELETE']
  }
});

io.on("connection", (socket) => {
  console.log("Connection made.");

  // Handle adding a task
  socket.on("addTask", (task) => {
    // If using a database, save the task
    const newTask = new Task(task);
    newTask.save();

    // Broadcast the new task to all clients
    io.emit("addTask", task);
  });

  // Handle deleting a task
  socket.on("deleteTask", (taskId) => {
    // If using a database, delete the task
    // await Task.findByIdAndDelete(taskId);

    // Broadcast the task deletion to all clients
    io.emit("deleteTask", taskId);
  });

  socket.on("disconnect", () => {
    console.log("Connection disconnected.");
  });
});

