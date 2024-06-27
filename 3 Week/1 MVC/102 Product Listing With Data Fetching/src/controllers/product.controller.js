import ProductModel from "../models/product.model.js";

// Import the necessary modules here
export default class ProductController {
  getProducts = (req, res) => {
    // creating instance of ProductModel
    const productModel = new ProductModel();
    let products = productModel.fetchProducts();
    // console.log(products);
    // calling fetchProducts method of ProductModel
    res.render("product", { products: products })
  };
}
