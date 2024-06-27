const express = require('express')

// Create a server
const server = express()


// TODO: First Way to create Middleware
// Handle default request
// """server.get('/', (req, res, next) => {
//     //? 1st middleware
//     console.log('First MiddleWare Hit');
//     next(); // calling second middleware
// }, (req, res) => {
//     //? 2nd middleware
//     res.json({ request: "this is a get request" })
// })
//! Looke messy? No worry
// """

// Todo : Seconde way to handle middleware
//? do this instead.
server.get('/', (req, res, next) => {
    console.log('First middleware');
    next()      //! Isn't this good?
})
server.get('/', (req, res, next) => {
    res.send('Hii Welcome to the Second Middleware!')
})


server.post('/', (req, res) => {
    res.json({ request: "this is a post request" })
})

// Listen on specified port
server.listen(3000, () => {
    console.log('listening on port 3000')
})