import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    examType: {
      type: String,
      enum: ["jee", "neet", "gate", "CET-PCB", "CET-PCM", "other"],
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // 10 digit validation
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiry: { type: Date },
    exam_id: {
      type: mongoose.Schema.Types.ObjectId, // reference to Exams collection
      ref: "Exam",
      // required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // reference to User collection
      ref: "User",
    },
  },
  { timestamps: true }
); // optional: adds createdAt, updatedAt

export default mongoose.model("Subject", subjectSchema);
