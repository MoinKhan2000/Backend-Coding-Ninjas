const http = require('http');
const fs = require('fs')
const server = http.createServer((req, res) => {
    const index = fs.readFileSync('./index.html', 'utf8');
    const about = fs.readFileSync('./about.html', 'utf8');
    const contact = fs.readFileSync('./contact.html', 'utf8');
    const users = fs.readFileSync('./users.html', 'utf8');

    const url = req.url;
    res.write(index)
    switch (url) {
        case '/':
            return res.end(index);
        case '/users':
            return res.end(users);
        case '/about':
            return res.end(about);
        case '/contact':
            return res.end(contact);
        default:
            return res.end('<html><body><h1>404 Not Found!</h1></body></html>');

    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
