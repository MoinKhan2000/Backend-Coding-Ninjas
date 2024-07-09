import express from 'express';
import { CartItemController } from './cart.controller.js';

const router = express.Router()
const cartItemController = new CartItemController()
router.post('/', cartItemController.getAllCartItems)
router.post('/add', cartItemController.add)
router.post('/mycartitems', cartItemController.getCartOfuser)
router.post('/delete', cartItemController.deleteCartItem)


export default router