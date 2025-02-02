// Please don't change the pre-written code
// Import the necessary modules here

import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import { renderBlogForm } from "./src/controllers/blog.controller.js";

const app = express();

app.get('/createblog', renderBlogForm);
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(expressEjsLayouts);
app.use(express.static('src/views'));

// Write your code here

export default app;
