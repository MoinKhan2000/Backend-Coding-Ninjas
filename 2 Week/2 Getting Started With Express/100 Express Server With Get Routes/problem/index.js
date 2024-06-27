const express = require('express')

// Create a server
const server = express()

// Handle default request
server.get('/', (req, res) => {
    res.send('Be a Coding Ninja.')
})

module.exports = { server };
