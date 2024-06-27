import express from 'express';
let app = express()

app.get('/', function (req, res) {
    res.send('Welcome to the E-Commerce APIs')
})


let port = 3000
app.listen(port, () => {
    console.log(`☼ : Server Is  listening on ${port}`);
})