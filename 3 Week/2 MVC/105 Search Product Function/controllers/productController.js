// Please don't change the pre-written code
// Import the necessary modules here

import ProductModel from "../models/ProductModel.js";

const productModel = new ProductModel();
export default class productController {
  index = (req, res) => {
    res.render("index", { products: productModel.getAllProducts() });
  };

  search = (req, res) => {
    // console.log("search", req.body);
    let name = req.body.name
    let result = productModel.searchResult(name)
    // console.log(result);
    if (result) {
      res.render("index", { products: result });
    } else {
      res.send("Product not found")
    }

  };
}
