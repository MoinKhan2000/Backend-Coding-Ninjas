// Import the necessary modules here
import axios from 'axios';

export const userModel = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
