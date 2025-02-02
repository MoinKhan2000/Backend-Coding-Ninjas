// 1. Import express
import express from 'express'
import ProductController from './product.controller.js'

const productController = new ProductController()
// 2. Initialize Express Router

const router = express.Router()

router.get('/', productController.getAllProducts)
router.post('/', productController.addProduct)

export default router