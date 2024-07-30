import express from 'express';
import userRouter from './src/features/user/user.routes.js';
import postRoutes from './src/features/post/post.routes.js';
import { jwtAuth } from './src/middlewares/authHandler.middleware.js';
import likeRoutes from './src/features/like/like.routes.js';
import commentRoutes from './src/features/comment/comment.routes.js';
import swagger from 'swagger-ui-express'
import apiDocs from "./swagger.json" assert {type: 'json'}
// Initializing application.
let app = express()

// Allowing the json to be parsed.
app.use(express.json())

// Allowing the query parators to be parsed.
app.use(express.query())

// Allowing public folder to serve static files.
app.use(express.static('./uploads'));

// Route 1. for user related routes.
app.use('/api', userRouter)
app.use('/api/posts', jwtAuth, postRoutes)
app.use('/api/likes', jwtAuth, likeRoutes)
app.use('/api/comments', jwtAuth, commentRoutes)


// Swagger UI for developers 
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs))


// Starting the server.
app.listen(3000, () => {
        console.log(`Server is listening on ${3000}`);
})