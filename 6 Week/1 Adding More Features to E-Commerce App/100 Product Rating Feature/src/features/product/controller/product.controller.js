// Please don't change the pre-written code
// Import the necessary modules here
// Write your code here

import { fetchAllProducts, rateProductModel } from "../model/product.model.js";

export const getAllProducts = (req, res, next) => {
  const products = fetchAllProducts();
  res.json({ success: true, products });
};
export const getOneProduct = (req, res, next) => {
  res.json({ success: true, msg: "getOneProduct working" });
};
export const addProduct = (req, res, next) => {
  res.json({ success: true, msg: "addProduct working" });
};

export const rateProduct = (req, res, next) => {
  const { userId, productId, rating } = req.query
  let result = rateProductModel(productId, userId, rating)
  if (result.success) {
    return res.status(200).json(result)
  }
  else {
    return res.status(200).json(result)
  }
};
