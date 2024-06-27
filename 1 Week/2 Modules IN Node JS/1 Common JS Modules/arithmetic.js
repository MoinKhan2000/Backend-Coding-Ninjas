function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function modulus(a, b) {
    return a % b
}

function pow(a, b) {
    return Math.pow(a, b)
}

// 1. Common JS
module.exports = { add: add, subtract, multiply, divide, modulus }


// 2. ES6 Modules. ECMA SCRIPT