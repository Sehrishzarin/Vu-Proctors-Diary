import mongoose from "mongoose";

const dutySchema = new mongoose.Schema({
  examName: { type: String, required: true },
  date: { type: Date, required: true },
  center: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["superintendent", "invigilator"], required: true },
}, { timestamps: true });

export default mongoose.model("Duty", dutySchema);
