import ProductModel from "./product.model.js";

export default class ProductController {
    getAllProducts(req, res) {
        const products = ProductModel.getAllProducts()
        res.status(200).send(products)
    }

    addProduct(req, res) {
        console.log(req.body);
        let { id, name, desc, imageUrl, category, price, sizes } = req.body
        const result = ProductModel.addProduct(id, name, desc, imageUrl, category, price, sizes)
        if (result) { res.status(200).send(result) }
    }

    rateProduct(req, res) {
        let { id } = req.params.id
        let { rating } = req.body
        ProductModel.rateProduct(id, rating)
    }

    getOneProduct(req, res) {
        let { id } = req.params
        ProductModel.getProductById(id)
    }
}