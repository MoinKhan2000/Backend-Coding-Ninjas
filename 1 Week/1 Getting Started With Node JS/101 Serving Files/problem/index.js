// Please don't change the pre-written code
// Import the necessary modules here
const http = require('http');
const fs = require('fs');
const index = fs.readFileSync('./index.html', 'utf8');

const port = 8080
const server = http.createServer((req, res) => {
    return res.end(index)
})
server.listen(port, () => {
    console.log('Server is listening on port ' + port);

})
module.exports = server;
