import nodemailer from 'nodemailer';
import readline from 'readline';

const Solution = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "codingninjas2k16@gmail.com",
      pass: "slwvvlczduktvhdj"
    }
  });

  rl.question("Enter the recipient: ", async (recipient) => {
    const mailOptions = {
      from: 'codingninjas2k16@gmail.com', // corrected typo here
      to: recipient, // corrected variable name here
      subject: "Coding Ninjas",
      text: "The world has enough coders; be a coding ninja!"
    };

    try {
      const res = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.log("Email sent failed! due to ", error);
    }

    rl.close();
  });
};

export default Solution;
// Solution();
