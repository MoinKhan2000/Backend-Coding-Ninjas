const express = require('express')
// Create a server
const server = express()

const firstMiddleware = (req, res, next) => {
    console.log('First middleware');
    next();
}
const secondMiddleware = (req, res, next) => {
    res.send('Second middleware');
    next();
}
const globalMiddleWare = (req, res, next) => {
    console.log('Global middleware');
    next();
}

//! Automatically running each time 
server.use(globalMiddleWare)
server.get('/', firstMiddleware, secondMiddleware)

// Listen on specified port
server.listen(3000, () => {
    console.log('listening on port 3000')
})