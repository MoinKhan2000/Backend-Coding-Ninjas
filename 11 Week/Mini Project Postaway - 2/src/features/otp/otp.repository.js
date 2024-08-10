import { OTPModel } from './otp.schema.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { UserModel } from '../users/user.schema.js';
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "codingninjas2k16@gmail.com",
    pass: "slwvvlczduktvhdj",
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

export default class OTPRepository {
  // Save OTP in the database and send it via email
  async sendOTP(email) {
    try {
      // Generate a new OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      const expires = new Date(Date.now() + 10 * 60 * 1000);

      // Delete any existing OTP for the email
      await OTPModel.deleteMany({ email });

      // Save the new OTP
      const otpEntry = new OTPModel({
        email,
        otp,
        expires
      });

      await otpEntry.save();

      // Send OTP via email
      const mailOptions = {
        from: "codingninjas2k16@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP for verification is ${otp}. It is valid for the next 10 minutes.`,
      };

      return transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Error handling OTP: ' + error.message);
    }
  }

  // Verify if the OTP is valid
  async verifyOTP(email, otp) {
    try {
      const otpEntry = await OTPModel.findOne({
        email,
        otp,
        expires: { $gt: new Date() }
      });

      return !!otpEntry;
    } catch (error) {
      throw new Error('Error verifying OTP: ' + error.message);
    }
  }

  // Reset the user's password
  async resetPassword(email, otp, newPassword) {
    try {
      const isValid = await this.verifyOTP(email, otp);

      if (!isValid) {
        throw new Error('Invalid or expired OTP');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await UserModel.findOneAndUpdate(
        { email },
        { $set: { password: hashedPassword } }
      );

      // Optionally, clear the OTP after successful password reset
      await OTPModel.deleteMany({ email });
    } catch (error) {
      throw new Error('Error resetting password: ' + error.message);
    }
  }
}
