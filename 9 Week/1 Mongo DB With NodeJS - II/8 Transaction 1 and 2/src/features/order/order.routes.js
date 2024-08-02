import express from 'express';
import OrderController from './order.controller.js';
const orderController = new OrderController()

const router = express.Router()
router.post('/', (req, res, next) => { orderController.placeOrder(req, res, next) })
router.post('/getTotalAmount', (req, res, next) => { orderController.getTotalAmount(req, res, next) })

export default router