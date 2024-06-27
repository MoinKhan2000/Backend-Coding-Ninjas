const fs = require('fs')

// Reading Data
fs.readFile('temp.txt', (err, data) => {
    err ? console.log(err) : console.log(data.toString());
})

fs.writeFile('temp.txt', 'Hii Kya Kar Rahe Ho? ', (err) => {
    err && console.log(err)
})

fs.appendFile('temp.txt', '\t\n\t\t\t\Makkhi maar raha hu', (err) => {
    err && console.log(err)
})

fs.unlink("temp.txt", (err) => {
    console.log(err)
})

console.log("This is another operation...");
