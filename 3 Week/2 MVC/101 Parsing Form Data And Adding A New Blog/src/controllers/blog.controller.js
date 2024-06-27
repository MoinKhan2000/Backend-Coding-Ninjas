// src/controllers/blog.controller.js
import { blogs } from '../models/blog.model.js';

export const renderBlogs = (req, res) => {
  return res.render('blogs', { blogs });
};

export const renderBlogForm = (req, res) => {
  return res.render('addBlogForm');
};

export const addBlog = (req, res) => {
  const { title, description, img } = req.body;
  blogs.push({ title, description, img });
  return res.render('blogs', { blogs });
};
