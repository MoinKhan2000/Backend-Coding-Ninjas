const readline = require("readline");

const Solution = () => {
  const qInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  qInterface.question("Enter the first number: ", (n1) => {
    qInterface.question("Enter the second number: ", (n2) => {
      const maxi = Math.max(Number(n1), Number(n2));
      console.log(`The maximum of the two numbers is: ${maxi}`);
      qInterface.close();
    });
  });
};

Solution();
module.exports = Solution;