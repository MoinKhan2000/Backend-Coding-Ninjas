const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // Expecting data from Client API.
        console.log(req.body);
        let body = "";
        req.on('data', (data) => {
            body += data.toString();
        })
        req.on('end', () => {
            console.log(body);
            console.log('Ended');
            res.end("Data is received.")
        })
    }
    else {
        console.log('Function ends here.');
        res.end("Data is received")
    }
})

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})
