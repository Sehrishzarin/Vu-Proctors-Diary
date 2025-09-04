import Duty from "../models/Duty.js";

export const assignDuty = async (req, res) => {
  try {
    const { examName, date, center, assignedTo, role } = req.body;

    console.log("👉 Duty request body:", req.body);
    console.log("👉 Admin making request:", req.user);

    // Basic validation
    if (!examName || !date || !center || !assignedTo || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check for scheduling conflict
    const conflict = await Duty.findOne({ assignedTo, date });
    if (conflict) {
      return res.status(400).json({ msg: "User already has a duty on this date" });
    }

    // Create duty
    const duty = new Duty({ examName, date, center, assignedTo, role });
    await duty.save();

    return res.status(201).json(duty);
  } catch (err) {
    console.error("❌ assignDuty error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getMyDuties = async (req, res) => {
  try {
    const duties = await Duty.find({ assignedTo: req.user.id });
    res.json(duties);
  } catch (err) {
    console.error("❌ getMyDuties error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
