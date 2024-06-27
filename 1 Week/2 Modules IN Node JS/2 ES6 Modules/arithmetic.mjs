export function sum(a, b) {
    return a + b;
}
export function divide(a, b) {
    return a / b;
}

export function subtract(a, b) {
    return a - b;
}
export function multiply(a, b) {
    return a * b;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return sum(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 0;
    }
}


export default function helloWorld() {
    console.log("Hello World");
}