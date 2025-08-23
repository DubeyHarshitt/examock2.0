import User from "../Models/User.model.js";
import bcrypt from "bcryptjs";

import generateAccessToken from '../Helper/accessToken.js'
import generateRefreshToken from '../Helper/refreshToken.js'

const registerUser = async (req, res) => {

  // -------- ONE FORM (Register or Login automatically) -------- 
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
        console.log("Email and password are required");
    }

    let user = await User.findOne({ email });

    if (user) {
      // ---- LOGIN FLOW ----
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });

      const payload = { id: user._id, email: user.email };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
        // console.log("accessToken  :-  "+accessToken);
        // console.log("refreshToken  :-  "+refreshToken);

      return res.status(200).json({
        success: true,
        action: "login",
        message: "Login successful",
        accessToken,
        refreshToken,
      });
    } else {
      // ---- REGISTER FLOW ----
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({ email, password: hashedPassword });
      await user.save();

      return res.status(201).json({
        success: true,
        action: "register",
        message: "User registered successfully",
        // you can also return tokens here if you want auto-login
      });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default registerUser;