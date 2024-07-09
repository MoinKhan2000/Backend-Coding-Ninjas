
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
}
let cartItems = [{ "productId": 1, "userId": 3, "quantity": 2, "id": 2 }]

