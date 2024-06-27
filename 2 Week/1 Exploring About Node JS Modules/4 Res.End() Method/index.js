const http = require('http')
const server = http.createServer((req, res) => {
    res.write('This is coming from Node JS Server.')
    console.log(req.url);
    if (req.url === '/first') {
        return res.end('This is first response from Node JS')
    }
    return res.end('This is default response from Node  ')
})
server.listen(3000, () => {
    console.log('listening on port 3000')
})