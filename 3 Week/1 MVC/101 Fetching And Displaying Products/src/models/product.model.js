// Import the necessary modules here
import { products } from "../assets/products.js"
export default class ProductModel {
  fetchProducts = () => {
    console.log(products);
    return products
  };
}
