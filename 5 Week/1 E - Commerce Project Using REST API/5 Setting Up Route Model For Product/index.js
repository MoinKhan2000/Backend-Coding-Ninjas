import express from 'express';
import productRouter from './src/features/product/product.routes.js';
let app = express()

app.get('/', function (req, res) {
    res.send('Welcome to the E-Commerce APIs')
})

// For all requests related to product, redirect to the product routes.
app.use('/api/products', productRouter)

let port = 3000
app.listen(port, () => {
})
console.log(`Server Is listening on ${port}`);