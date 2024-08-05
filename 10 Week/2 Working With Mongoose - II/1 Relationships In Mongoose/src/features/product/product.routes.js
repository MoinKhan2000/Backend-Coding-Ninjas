// 1. Import express
import express from 'express'
import ProductController from './product.controller.js'
import { upload } from '../../middlewares/fileUpload.middleware.js'

const productController = new ProductController()
// 2. Initialize Express Router

const router = express.Router()

router.get('/', (req, res) => { productController.getAllProducts(req, res) })
// localhost:3000/api/products/filter?minPrice=10&maxPrice=1000&category=shoes
router.get('/filter', (req, res) => { productController.filterProduct(req, res) })
router.get('/:id', (req, res) => { productController.getOneProduct(req, res) })
router.post('/', upload.single('imageUrl'), (req, res) => { productController.addProduct(req, res) })
router.post('/rate', (req, res) => { productController.rateProduct(req, res) })
router.post('/average', (req, res) => { productController.averageProductPricePerCategory(req, res) })

export default router