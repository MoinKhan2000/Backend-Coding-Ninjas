const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Welcome to the NodeJS Server')
})
const port = 5000
server.listen(port, () => {
    console.log('listening on port', port);
})