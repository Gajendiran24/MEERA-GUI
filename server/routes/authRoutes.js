import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { sendOtpToEmail, verifyOtp } from "../controllers/otpController.js";
import { upload } from "../middleware/Upload.js";

const router = express.Router();

// ✅ Route for file upload + register
router.post("/register", upload.single("document"), registerUser);

// ✅ Login
router.post("/login", loginUser);

// ✅ OTP
router.post("/send-otp", sendOtpToEmail);
router.post("/verify-otp", verifyOtp);

export default router;
