import express from 'express';
import { CartItemController } from './cart.controller.js';

const router = express.Router()
const cartItemController = new CartItemController()
router.post('/', (req, res) => { cartItemController.getAllCartItems(req, res) })
router.post('/add', (req, res) => { cartItemController.add(req, res); })
router.post('/mycartitems', (req, res) => { cartItemController.getCartOfuser(req, res); })
router.post('/delete', (req, res) => { cartItemController.deleteCartItem(req, res) })


export default router