import swagger from 'swagger-ui-express'
import express from 'express';

import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cart.routes.js'
import { jwtAuth } from './src/middlewares/jwtAuth.middleware.js';
import apiDocs from "./swagger.json" assert {type: 'json'}

let app = express()

app.get('/', function (req, res) {
    res.send('Welcome to the E-Commerce APIs')
})

// To allow to json data to be parsed.
app.use(express.json())
app.use(express.query())
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs))
// For all requests related to product, redirect to the product routes.
app.use('/api/products', jwtAuth, productRouter)
app.use('/api/cartitems', jwtAuth, cartRouter)
app.use('/api/users', userRouter)

let port = 3000
app.listen(port, () => {
})
console.log(`Server Is listening on ${port}`);