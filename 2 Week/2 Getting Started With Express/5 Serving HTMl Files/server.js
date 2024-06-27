const express = require('express');
const server = express();

// Serving Static Files

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.use(express.static("public"))

server.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
