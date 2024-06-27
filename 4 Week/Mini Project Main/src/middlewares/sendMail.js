import nodemailer from "nodemailer";
import EventEmitter from "events";

// Custom Event Emitter
class CustomEvent extends EventEmitter {
    mailSent(email) {
        this.emit("mailSent", email);
    }
}

const customEvent = new CustomEvent();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "codingninjas2k16@gmail.com",
        pass: "slwvvlczduktvhdj", // Use an App Password if 2-step verification is enabled
    },
    secure: true, // Use TLS
    tls: {
        rejectUnauthorized: false, // Allow unauthorized certificates for troubleshooting
    },
});

// Function to send an email
const sendApplicationReceivedEmail = (
    applicantEmail,
    applicantName,
    position,
    company,
    location,
    packagePerAnnum,
    skills,
    title,
    description,
    applicants,
    openings,
    expires,
    status,
    isTech,
    postedBy
) => {
    const mailOptions = {
        from: "codingninjas2k16@gmail.com",
        to: applicantEmail,
        subject: `Application Received for ${position} at ${company}`,
        text: `Dear ${applicantName},

We have received your application for the ${position} position at ${company}. Below are the details of the job you applied for:

Position: ${position}
Company: ${company}
Location: ${location}
Package: ${packagePerAnnum} per annum
Skills Required: ${skills}
Title: ${title}
Description: ${description}
Number of Applicants: ${applicants}
Openings: ${openings}
Application Expires On: ${expires}
Status: ${status}
Technical Position: ${isTech ? 'Yes' : 'No'}
Posted By: ${postedBy}

We are currently reviewing your application and will get back to you shortly.

Best regards,
The Recruiting Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Failed to send email to ${applicantEmail}:`, error);
        } else {
            console.log(`Email sent: ${info.response}`);
            customEvent.mailSent(applicantEmail);
        }
    });
};

// Event listener for mailSent event
customEvent.addListener("mailSent", (email) => {
    console.log("Custom event 'mailSent' emitted");
    console.log(`Confirming that the email has been sent successfully to ${email}`);
});

export { sendApplicationReceivedEmail };
