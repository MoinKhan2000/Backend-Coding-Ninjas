// Using the functions of the arithmetic modules we created
const { add, subtract, multiply, divide, modulus } = require('./arithmetic.js');
const newFunc = require('./arithmetic')
console.log(add(1, 2))
console.log(multiply(1, 2));
console.log(divide(1, 2));
console.log(modulus(10, 2));
console.log(subtract(10, 2));
console.log(require('./arithmetic.js'))
console.log(newFunc);

// {
//     add: [Function: add],
//     subtract: [Function: subtract],
//     multiply: [Function: multiply],
//     divide: [Function: divide],
//     modulus: [Function: modulus]
// }