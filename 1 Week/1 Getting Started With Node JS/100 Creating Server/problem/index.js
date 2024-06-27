const http = require('http');

const port = 8080;

// Create Server.
const server = http.createServer((req, res) => {
    // Here comes the request
    res.end('Response received at port 8080.');
});

// Configure server to listen on port 8080
server.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});

module.exports = server;
