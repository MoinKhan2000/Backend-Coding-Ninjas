import express from 'express';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';

let app = express()

app.get('/', function (req, res) {
    res.send('Welcome to the E-Commerce APIs')
})

// To allow to json data to be parsed.
app.use(express.json())
app.use(express.query())
// For all requests related to product, redirect to the product routes.
app.use('/api/products', basicAuthorizer, productRouter)
app.use('/api/users', userRouter)

let port = 3000
app.listen(port, () => {
})
console.log(`Server Is listening on ${port}`);