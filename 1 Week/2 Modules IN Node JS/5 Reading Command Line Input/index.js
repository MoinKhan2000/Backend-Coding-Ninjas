// Import readline
const readline = require('readline')

// Create a new readline interface
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Reading values
interface.question("Enter your first number \n", num1 => {
    interface.question("Enter your second number \n", num2 => {
        console.log("The sum of the two numbers is ", Number(num1) + Number(num2));
    })
})