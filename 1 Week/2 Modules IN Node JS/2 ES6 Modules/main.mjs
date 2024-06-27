import main, { divide, multiply, subtract, sum } from "./arithmetic.mjs";
import * as arithmeticModule from "./arithmetic.mjs"
console.log(arithmeticModule.divide(1, 2));          // 0.5
main()          // as in the arithmetic module helloWorld is defualt exported ie. we can import it in any name.  


console.log(subtract(2, 3));
console.log(sum(2, 3));
console.log(divide(2, 3));
console.log(multiply(2, 3));


// We need to rename the file to use modules as .mjs instead of .js
