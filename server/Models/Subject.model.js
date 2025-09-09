import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subject_name: {
    type: String,
    required: true,
    trim: true,
  },
  exam_id: {
    type: mongoose.Schema.Types.ObjectId, // reference to Exams collection
    ref: "Exam",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // reference to User collection
    ref: "User",
  },
}, { timestamps: true }); // optional: adds createdAt, updatedAt

export default mongoose.model("Subject", subjectSchema);
