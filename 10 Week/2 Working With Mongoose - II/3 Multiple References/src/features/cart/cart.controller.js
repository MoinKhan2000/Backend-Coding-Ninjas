import CartRepository from "./cart.repository.js";

export class CartItemController {
    constructor() {
        this.cartRepository = new CartRepository();
    }
    async add(req, res) {
        const { productId, quantity } = req.body
        const userId = req.userId
        let newItem = await this.cartRepository.add(productId, userId, quantity)
        return res.status(201).json(newItem)
    }
    async getAllCartItems(req, res) {
        let cartItems = await this.cartRepository.getAllCartItems()
        return res.status(200).json(cartItems)
    }

    async getCartOfuser(req, res) {
        let userId = req.userId
        let cartItems = await this.cartRepository.getCartOfUser(userId)
        return res.status(200).json(cartItems)
    }
    async deleteCartItem(req, res) {
        let userId = req.userId
        let { productId } = req.body
        let result = await this.cartRepository.deleteFromCart(userId, productId)
        if (result.deleteCount > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).send(result)
        }
    }
}