// 1. nodemailer
const nodemailer = require('nodemailer');

// 2. Configure email and send it.
async function sendMail() {
    // 1. Create an email transporter.

    // SMTP 
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "moink3181@gmail.com",
            pass: 'nirwktnfapoqtgbv'
        }
    })

    // 2. Configure email content
    const mailOptions = {
        from: 'moink3181@gmail.com',
        to: 'moinkh089@gmail.com',
        subject: "Hii welcome to NodeJS Application",
        text: "This is an email using nodemailer in node.js"
    }

    // Send the email
    try {
        const res = await transporter.sendMail(mailOptions)
        console.log("Email sent successfully");

    } catch (error) {
        console.log("Email sent failed! due to ", error);

    }

}
sendMail()