import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

export const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connection made.");

    // Handle a user joining a room
    socket.on("join", ({ username, room }) => {
        socket.join(room);
        console.log(`${username} joined room ${room}`);

        // Welcome the current user
        socket.emit('message', { username: 'System', message: `Welcome to the room ${room}, ${username}!` });

        // Notify other users in the room
        socket.to(room).emit('userJoined', { username });

        // Handle user sending a message
        socket.on("sendMessage", ({ username, room, message }) => {
            // Broadcast the message to everyone in the room
            io.to(room).emit('message', { username, message });
        });

        // Handle user disconnecting
        socket.on("disconnect", () => {
            console.log(`${username} disconnected from room ${room}`);
            socket.to(room).emit('message', { username: 'System', message: `${username} has left the room.` });
        });
    });

});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
