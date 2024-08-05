import ProductModel, { products } from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository()
    }
    async getAllProducts(req, res) {
        const products = await this.productRepository.getAllProducts()
        res.status(200).send(products)
    }

    async addProduct(req, res) {
        try {
            console.log(req.body);
            let { name, desc, category, price, sizes } = req.body
            let imageUrl = req.file.filename
            sizes = sizes.split(',')
            const newProduct = new ProductModel(name, desc, imageUrl, category, parseInt(price), sizes);
            const createdProduct = await this.productRepository.addProduct(newProduct)
            if (createdProduct) {
                console.log('created product', createdProduct);
                return res.status(200).send(createdProduct)
            } else {
                return res.status(400).send('Failed to create product')
            }
        } catch (error) {
            return res.status(error.statusCode).send(error.message)
        }

    }


    async getOneProduct(req, res) {
        try {
            let id = req.params.id;
            const product = await this.productRepository.getProductById(id);
            if (product) {
                res.status(200).send(product);
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            const statusCode = error.statusCode || 500;
            const message = error.message || 'Internal Server Error';
            return res.status(statusCode).send(message);
        }
    }


    async filterProduct(req, res) {
        const minPrice = Number.parseInt(req.query.minPrice)
        const maxPrice = Number.parseInt(req.query.maxPrice)
        const category = req.query.category
        const products = await this.productRepository.filter(minPrice, maxPrice, category)
        res.status(200).send(products)
    }

    async rateProduct(req, res) {
        const userId = req.userId
        const { productId, rating } = req.body
        try {
            await this.productRepository.rateProduct(userId, productId, Number.parseFloat(rating))
        } catch (error) {
            return res.status(400).send(error.message)
        }
        return res.status(200).send('Product rated successfully')
    }

    async averageProductPricePerCategory(req, res) {
        const userId = req.userId
        const { productId, rating } = req.body
        console.log(userId, productId, rating);
        try {
            const data = await this.productRepository.averagePrice()
            return res.status(200).send(data)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
}