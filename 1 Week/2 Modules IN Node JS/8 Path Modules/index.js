const fs = require('fs')
const path = require('path')

// Reading data
const filePath = path.join("src", "home", "data.txt")   // Relative path
const filePathResolved = path.resolve("src", "home", "data.txt")    //Absolute path

console.log(path.extname(filePathResolved))     // Getting the extension of the file.
fs.readFile(filePath, (err, data) => {
    console.log(data.toString());
})
console.log(filePath);
console.log(filePathResolved);
