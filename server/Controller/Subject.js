// routes/admissionRoutes.js
import User from "../Models/User.model.js"
import SubjectModel from "../Models/Subject.model.js";
import { generateOTP } from "../Helper/otpGenerator.js";

const selectSubjects = async (req, res) => {
  try {
    const { email, mobile, examType } = req.body;
    // console.log(req.body);

    if (!mobile || !examType || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Finding User
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min expiry

       // Create or update admission/subject
    let subject = await SubjectModel.findOne({ user_id : user._id });

    if (!subject) {
      subject = new SubjectModel({
        user_id: user._id,
        mobile,
        examType,
        otp,
        otpExpiry,
      });
    } else {
      subject.mobile = mobile;
      subject.examType = examType;
      subject.otp = otp;
      subject.otpExpiry = otpExpiry;
    }

    await subject.save();

    // update user enrollment status
    user.subject_id = subject._id;
    await user.save();
    // if (!user.isEnrolled) {
    //   user.isEnrolled = true;
    //   await user.save();
    // }
    // TODO: Send OTP via SMS/Email
    console.log(`OTP for ${email}: ${otp}`);

     res.status(201).json({
      message: "Admission created and user enrolled",
      subject,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default selectSubjects;
