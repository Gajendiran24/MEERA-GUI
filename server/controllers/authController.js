import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Registration Handler
export const registerUser = async (req, res) => {
  try {
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      phone,
      dob,
      address,
      language,
      voicePreference,
      emergencyContact,
      caretakerType,
      salary,
      timing,
      specialty,
      experience,
      medicalConditions,    
      currentMedications         
    } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document
    const user = new User({
      role,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      dob,
      address,
      language,
      voicePreference,
      emergencyContact,
      caretakerType,
      salary,
      timing,
      specialty,
      experience,
      medicalConditions,     
      currentMedications, 
      documentUrl: req.file ? req.file.path : null,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login Handler (you missed this before)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};