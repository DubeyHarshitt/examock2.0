import User from "../Models/User.model.js";
import SubjectModel from "../Models/Subject.model.js";

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Finding User
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Finding Subject
    const subject = await SubjectModel.findOne({ user_id: user._id });
    // console.log("user id " + user._id);
    // console.log("subject is " + subject);

    if (!subject)
      return res.status(404).json({ message: "Admission not found" });

    // console.log("both opt,s " + subject.otp + "  " + otp);
    // Validate OTP
    if (subject.otp !== otp || Date.now() > subject.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP after verification
    await SubjectModel.updateOne(
      { _id: subject._id },
      { $unset: { otp: "", otpExpiry: "" } }
    );

    await subject.save();

    // ✅ OTP verified → enroll user
    user.isEnrolled = true;
    await user.save();

    res.status(200).json({ message: "User enrolled successfully", subject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default verifyOtp;
