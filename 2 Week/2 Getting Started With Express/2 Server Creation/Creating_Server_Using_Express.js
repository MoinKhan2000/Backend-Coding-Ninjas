const express = require('express')

// Create a server
const server = express()

// Handle default request
server.get('/', (req, res) => {
    res.json({ request: "this is a get request" })
})
server.post('/', (req, res) => {
    res.json({ request: "this is a post request" })
})

// Listen on specified port
server.listen(3000, () => {
    console.log('listening on port 3000')
})