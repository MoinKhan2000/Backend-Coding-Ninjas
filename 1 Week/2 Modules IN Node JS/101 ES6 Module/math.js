// math.js - a CommonJS module for performing calculations on a set of numbers

export const sum = (nums) => {
  return nums.reduce((total, num) => total + num, 0);
}

export const mean = (nums) => {
  return sum(nums) / nums.length;
}

