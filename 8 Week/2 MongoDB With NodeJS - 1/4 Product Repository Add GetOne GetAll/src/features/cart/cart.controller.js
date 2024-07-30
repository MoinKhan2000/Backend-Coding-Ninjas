import { CartItemModel } from "./cart.model.js"

export class CartItemController {
    add(req, res) {
        const { productId, quantity } = req.query
        const userId = req.userId
        let newItem = CartItemModel.add(productId, userId, quantity)
        return res.status(201).json(newItem)
    }
    getAllCartItems(req, res) {
        let cartItems = CartItemModel.getAllCartItems()
        return res.status(200).json(cartItems)
    }
    getCartOfuser(req, res) {
        let userId = req.userId
        let cartItems = CartItemModel.getCartOfUser(userId)
        return res.status(200).json(cartItems)
    }
    deleteCartItem(req, res) {
        let userId = req.userId
        let { cartId } = req.query
        let result = CartItemModel.deleteFromCart(userId, Number.parseInt(cartId))
        if (result.success) {
            res.status(200).json(result)
        } else {
            res.status(404).send(result)
        }

    }
}