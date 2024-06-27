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
        let { id } = Number.parseInt(req.params.id)
        let { rating } = req.body
        ProductModel.rateProduct(id, rating)
    }

    getOneProduct(req, res) {
        let id = Number.parseInt(req.params.id)
        let product = ProductModel.getProductById(id)
        console.log("getOneProduct - > ", product, id);
        if (product) { res.status(200).send(product) }
        else { res.status(404).send('Product not found') }
    }

    filterProduct(req, res) {
        console.log(req.query);
        const minPrice = Number.parseInt(req.query.minPrice)
        const maxPrice = Number.parseInt(req.query.maxPrice)
        const category = req.query.category
        console.log(minPrice, maxPrice, category)
        const products = ProductModel.filter(minPrice, maxPrice, category)
        res.status(200).send(products)
    }
}