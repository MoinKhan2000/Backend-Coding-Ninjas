// Create a new instance of the server

// Import http library / module
const http = require('http');

// Create Server.
const server = http.createServer((req, res) => {
    // Here comes the request
    res.end('Welcome to the server ')
})

// 3. Choose a port number
const port = 3000
// 3. Specify a port to  listen to clinet's requests
server.listen(port)
console.log('Server is listening on port ' + port);

