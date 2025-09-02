// adminController.js
import User from "../models/User.js";

export const getPendingUsers = async (req, res) => {
  try {
    const pending = await User.find({ isApproved: false, role: { $ne: "Admin" } });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
    res.json({ message: "User approved", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User rejected and deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
