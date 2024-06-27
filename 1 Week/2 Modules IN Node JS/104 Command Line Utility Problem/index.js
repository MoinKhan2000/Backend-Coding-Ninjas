const fs = require("fs");

const Solution = () => {
  // Create a new file and write to it
  fs.writeFileSync("notes.txt", "The world has enough coders ");

  // Read the contents of the file and log to console
  const contents = fs.readFileSync("notes.txt", "utf8");
  console.log(contents);

  // Update the contents of the file
  fs.appendFileSync("notes.txt", "BE A CODING NINJA!");

  // Read the updated contents of the file and log to console
  const updatedContents = fs.readFileSync("notes.txt", "utf8");
  console.log(updatedContents);

  // Delete the file
  fs.unlinkSync("notes.txt");

  //  Note: This code uses blocking methods for simplicity and learning purposes. In real-world applications, it's recommended to use non-blocking methods for better performance.
};
Solution();
module.exports = Solution;