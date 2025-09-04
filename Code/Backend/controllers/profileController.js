import User from "../models/User.js";

// Get profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update profile (except CNIC & EmployeeID)
export const updateProfile = async (req, res) => {
  const { centerPreferences, availability, qualifications, contactInfo } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { centerPreferences, availability, qualifications, contactInfo },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
