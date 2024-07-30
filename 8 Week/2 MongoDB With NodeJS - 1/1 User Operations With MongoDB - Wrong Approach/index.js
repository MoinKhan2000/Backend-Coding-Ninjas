import swagger from 'swagger-ui-express'
import express from 'express';
import cors from 'cors'

import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cart.routes.js'
import { jwtAuth } from './src/middlewares/jwtAuth.middleware.js';
import apiDocs from "./swagger.json" assert {type: 'json'}
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/errorHandler/applicatioonError.js';
import { connectToMonngoDB } from './src/config/mongodb.js';

let app = express()

app.get('/', function (req, res) {
    res.send('Welcome to the E-Commerce APIs')
})

// CORS Policy configuration.

// Either we can set it manually or we can simply use the cors package from npm 
//? 1 Manual approach. 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next();
});

//? 2. Using the NPM CORS Package configuration.
let corsOptions = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

// To allow to json data to be parsed.
app.use(express.json())
app.use(express.query())
app.use(loggerMiddleware)
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs))
// For all requests related to product, redirect to the product routes.
app.use('/api/products', jwtAuth, productRouter)
app.use('/api/cartitems', jwtAuth, cartRouter)
app.use('/api/users', userRouter)

// Error Handler Middleware. 
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ApplicationError) {
        return res.status(err.code).send(err.message)
    }

    // server is unavailable.
    return res.status(500).send('Something went wrong, please try again later.')

})
// 404 Not found - Middleware too handle 404 request
app.use((req, res) => res.status(404).send("404 API Not Found "))

let port = 3000
app.listen(port, () => {
    console.log(`Server Is listening on ${port}`);
    connectToMonngoDB()
})