// Blocking code
console.log('Blocking code start');
for (var i = 0; i < 10000; i++) {
    // Simulating a time-consuming operation
}
console.log('Blocking code end');
console.log('--------------------------------');

// Non-blocking code
console.log('Non-blocking code start');
setTimeout(() => {
    console.log('Printing after 10 seconds');
}, 10000);
console.log('Non-blocking code end');
