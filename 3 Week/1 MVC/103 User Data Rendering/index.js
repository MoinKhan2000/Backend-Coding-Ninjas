import express from "express";
import path from "path";
import { userController } from "./src/controllers/users.controller.js";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", 'views'));
app.get("/users", userController);
app.use(express.static('src/views'));
export default app;
