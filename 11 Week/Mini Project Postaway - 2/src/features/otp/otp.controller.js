import OTPRepository from "./otp.repository.js";

export default class OTPController {
  constructor() {
    this.otpRepository = new OTPRepository();
  }

  // Send OTP to the user via email
  async sendOTP(req, res) {
    const email = req.email
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    try {
      await this.otpRepository.sendOTP(email);
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  }

  // Verify the provided OTP
  async verify(req, res) {
    const email = req.email
    const { otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
    try {
      const isValid = await this.otpRepository.verifyOTP(email, otp);

      if (isValid) {
        res.status(200).json({ message: 'OTP verified successfully' });
      } else {
        res.status(400).json({ message: 'Invalid or expired OTP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to verify OTP' });
    }
  }

  // Reset user password
  async resetPassword(req, res) {
    const email = req.email
    const { otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }
    try {
      await this.otpRepository.resetPassword(email, otp, newPassword);
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to reset password' });
    }
  }
}
