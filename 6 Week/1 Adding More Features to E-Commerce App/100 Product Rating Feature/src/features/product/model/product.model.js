import { getAllUsers } from '../../user/model/user.model.js';

let id = 3;
const products = [
  { id: 1, name: "iphone", price: 100000 },
  { id: 2, name: "oneplus", price: 50000 },
  { id: 3, name: "samsung", price: 60000 },
];

export const fetchAllProducts = () => {
  return products;
};

export const rateProductModel = (productId, userId, rating) => {
  // Validate the user first
  let allUsers = getAllUsers();
  let isValidUser = allUsers.find(user => user.id == userId);
  if (!isValidUser) {
    return { success: false, msg: 'user not found' };
  }

  // Find the product
  let productIndex = products.findIndex((product) => product.id === productId);
  if (productIndex < 0) {
    return { success: false, msg: 'product not found' };
  }

  // Ensure that the rating falls within the range of 0 to 5
  if (rating < 0 || rating > 5) {
    return {
      success: false,
      msg: "rating should be between 0 and 5"
    };
  }

  // Initialize the rating property if it does not exist
  if (!products[productIndex].rating) {
    products[productIndex].rating = [];
  }

  // Check if the user has already rated the product
  let existingRatingIndex = products[productIndex].rating.findIndex(r => r.userId == userId);

  if (existingRatingIndex >= 0) {
    // Update the rating
    products[productIndex].rating[existingRatingIndex].rating = rating;
  } else {
    // Add new rating
    products[productIndex].rating.push({ userId, rating });
  }

  return { success: true, msg: products[productIndex] };
};
