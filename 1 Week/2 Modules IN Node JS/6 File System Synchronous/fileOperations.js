const fs = require('fs');

// Reading file contents synchronously - blocking code.
console.log('Starting to read file contents');
// Read file in binary format
let data = fs.readFileSync('./data.txt', 'binary');
console.log(data.toString());

// Read file in UTF-8 format
data = fs.readFileSync('./data.txt', 'utf8');
console.log(data);
console.log('Continuing with other operations.');

// Creating a file synchronously - blocking code.
console.log('Starting to create a file');
// Create a new file with specified content
fs.writeFileSync('./new.txt', 'This is the content of a new file created by Moin Khan.', 'utf8');
console.log('Continuing with other operations.');

// Appending to a file synchronously
fs.appendFileSync('./new.txt', '\nAppending more content to the new file by Moin Khan.', 'utf8');
console.log('Starting to delete a file');

// Deleting a file synchronously
fs.unlinkSync('./new.txt');
console.log('Deletion of the file completed.');
