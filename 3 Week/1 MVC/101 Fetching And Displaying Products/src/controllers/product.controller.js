import ProductModel from "../models/product.model.js";

// Import the necessary modules here
export default class ProductController {
  getProducts = (req, res) => {
    // creating instance of ProductModel
    const productModel = new ProductModel();

    // calling fetchProducts method of ProductModel
    return res.send(productModel.fetchProducts())
  };
}
