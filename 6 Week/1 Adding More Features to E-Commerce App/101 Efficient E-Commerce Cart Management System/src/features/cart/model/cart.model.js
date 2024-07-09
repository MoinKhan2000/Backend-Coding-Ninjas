let cartId = 0;
export class cartModel {
  constructor(userId, productId, quantity) {
    this.id = ++cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = Number(quantity);
  }
}
const cartItems = [new cartModel(1, 2, 5), new cartModel(3, 3, 10)];

export const addToCart = (userId, productId, quantity) => {
  // check firstly if the user has already added the product so that we could update it.
  const existing = cartItems.find(item => item.userId == userId && item.productId == productId)
  if (existing) {
    existing.quantity = Number(quantity);
    return { success: true, item: existing }
  }

  if (!productId || !quantity) {
    return { success: false, msg: 'Enter ' }
  }

  const newItem = cartModel(userId, productId, quantity)
  cartItems.push(newItem);
  return { success: true, item: newItem }
};

export const removeFromCart = (userId, cartId) => {
  // Getting the id of the cart item and the userId
  let index = cartItems.findIndex(item => item.id === cartId);

  if (index < 0) {
    return { success: false, msg: "Cart item is not found" }
  }

  if (cartItems[index].userId !== userId) {
    return { success: false, msg: "operation not allowed" }
  }

  // Removing the cart item from the array
  cartItems.splice(index, 1);
  return { success: true, msg: "Cart item deleted successfully" }
};

let cartItem = []