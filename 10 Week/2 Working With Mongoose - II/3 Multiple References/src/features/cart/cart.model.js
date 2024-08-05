
export class CartItemModel {

    constructor(productId, userId, quantity) {
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
    }

    static add(productId, userId, quantity) {
        if (!productId || !userId || quantity < 0) return []
        const newItem = new CartItemModel(Number.parseInt(productId), Number.parseInt(userId), Number.parseInt(quantity));
        newItem.id = cartItems.length + 1
        cartItems.push(newItem);
        return newItem;
    }

    static getAllCartItems() {
        return cartItems
    }

    static getCartOfUser(userId) {
        return cartItems.filter(item => item.userId === userId)
    }
    static deleteFromCart(userId, cartId) {

        // Getting the id of the cart item and the userId
        let index = cartItems.findIndex(item => item.id === cartId);

        if (index < 0) {
            return { success: false, msg: "Cart item is not found" }
        }

        if (cartItems[index].userId !== userId) {
            return { success: false, msg: "User ID does not match" }
        }

        // Removing the cart item from the array
        cartItems.splice(index, 1);
        return { success: true, msg: "Cart item deleted successfully" }
    }
}
let cartItems = [{ productId: 1, userId: 3, quantity: 2, id: 1 }]

