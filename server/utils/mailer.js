import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "fe5fccf642ad33",      // your Mailtrap username
    pass: "132c8db6ef9488"   // paste the full password here
  }
});

export const sendOTP = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your MEERA App OTP Code",
            html: `<p>Your OTP code is: <b>${otp}</b></p><p>This code is valid for 5 minutes.</p>`
        });
    } catch (err) {
        console.error("Failed to send email:", err);
        throw err;
    }
};
