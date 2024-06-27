// 1. Import express
import express from 'express'
import ProductController from './product.controller.js'
import { upload } from '../../middlewares/fileUpload.middleware.js'

const productController = new ProductController()
// 2. Initialize Express Router

const router = express.Router()

router.get('/', productController.getAllProducts)

// localhost:3000/api/products/filter?minPrice=10&maxPrice=1000&category=shoes

router.get('/filter', productController.filterProduct)
router.get('/:id', productController.getOneProduct)
router.post('/', upload.single('imageUrl'), productController.addProduct)
export default router