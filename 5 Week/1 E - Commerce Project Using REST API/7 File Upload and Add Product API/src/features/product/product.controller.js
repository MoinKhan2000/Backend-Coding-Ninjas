import ProductModel, { products } from "./product.model.js";

export default class ProductController {
    getAllProducts(req, res) {
        const products = ProductModel.getAllProducts()
        res.status(200).send(products)
    }

    addProduct(req, res) {
        console.log(req.body);
        let { id, name, desc, category, price, sizes } = req.body
        let imageUrl = req.file.filename
        id = products.length + 1
        const addedProduct = ProductModel.addProduct(id, name, desc, imageUrl, category, price, sizes)
        if (addedProduct) { res.status(201).send(addedProduct) }
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