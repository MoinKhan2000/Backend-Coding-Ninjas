import './src/config/env.js'
import swagger from 'swagger-ui-express'
import apiDocs from "./swagger.json" assert {type: 'json'}
import express from "express";
import cors from "cors";
import userRouter from "./src/features/users/user.routes.js";
import friendRouter from "./src/features/friends/friends.routes.js";
import likeRouter from "./src/features/likes/like.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import postsRouter from "./src/features/posts/posts.routes.js";
import { connectUsingMongoose } from './src/errorHandler/connectToDB.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';

let app = express();

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
app.use(express.json())
app.use(express.query())


//? 3. Swagger API configuration.
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs))

app.get('/', function (req, res) {
  res.send('Welcome to the Social Media Platform')
})

//? All has been implemented. 
app.use('/api/users', userRouter)       //? Done
app.use('/api/posts', jwtAuth, postsRouter)       //? Done
app.use('/api/likes', jwtAuth, likeRouter)       //? Done
app.use('/api/comments', jwtAuth, commentRouter)       //? Done
app.use('/api/friends', jwtAuth, friendRouter)       //? Done
app.use('/api/otp', jwtAuth, otpRouter)       //? Done


//? Additionaly I have implemented email based OTP System usign nodemailer. 
//? User will get the reset password OTP on the registered email from where He/She can reset their password.

app.use((req, res) => { res.status(404).send("404 API Not Found") })

const port = 3000
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
  connectUsingMongoose()
})