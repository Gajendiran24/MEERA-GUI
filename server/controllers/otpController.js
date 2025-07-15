import { sendOTP } from '../utils/mailer.js';

const otpStore = new Map(); // key: email, value: { otp, expiresAt }

export const sendOtpToEmail = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(email, { otp, expiresAt });

  try {
    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);

  if (!stored || stored.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: 'OTP expired' });
  }

  otpStore.delete(email); // clean up
  res.status(200).json({ message: 'OTP verified successfully' });
};