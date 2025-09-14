import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  name: { type: String },
  isEnrolled: {
    type: Boolean,
    default: false,
  },

  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
