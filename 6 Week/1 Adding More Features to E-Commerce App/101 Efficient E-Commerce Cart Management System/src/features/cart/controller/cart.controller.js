// Please don't change the pre-written code
// Import the necessary modules here

import { addToCart, removeFromCart } from "../model/cart.model.js";


export const addToCartController = (req, res) => {
  const { productId, quantity } = req.query
  const userId = req.userId
  const cartItem = addToCart(userId, productId, quantity);
  if (cartItem.success) {
    res.status(200).json(cartItem)
  }
  else {
    res.status(400).json(cartItem)
  }
};

export const removeFromCartController = (req, res) => {
  let userId = req.userId
  let cartItemId = Number.parseInt(req.params.itemId)
  let result = removeFromCart(userId, cartItemId)
  if (result.success) {
    res.status(200).json(result)
  } else {
    res.status(404).json(result)
  }
};
