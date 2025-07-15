import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  dob: String,
  address: String,

  // User-specific
  language: String,
  voicePreference: String,
  emergencyContact: String,
  caretakerType: String,
  medicalConditions: String,
  currentMedications: String,

  // Caretaker-specific
  salary: String,
  timing: String,

  // Doctor-specific
  specialty: String,
  experience: String,

  // Common
  documentUrl: String,
});

const User = mongoose.model("User", userSchema);
export default User;