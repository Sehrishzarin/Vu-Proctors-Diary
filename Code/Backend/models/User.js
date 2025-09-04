import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "superintendent", "invigilator"], required: true },
  employeeId: { type: String, required: true, unique: true },
  cnic: { type: String, required: true, unique: true },
  // Profile fields
  centerPreferences: [String],
  availability: { type: String }, // e.g. "Weekends", "9AM-5PM"
  qualifications: { type: String },
  contactInfo: { type: String },
  isApproved: { type: Boolean, default: false }, // admin approval
}, { timestamps: true });

export default mongoose.model("User", userSchema);
