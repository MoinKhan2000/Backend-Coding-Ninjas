const middleware = require("./middlewares/middleware.js");
const { firstMiddleware, secondMiddleware } = middleware
const express = require('express')
const server = express()
server.get('/', firstMiddleware, secondMiddleware)
server.listen(3000, () => {
    console.log('listening on port 3000')
})