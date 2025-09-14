import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'

const router = express.Router();

// Step 1: Initiate Google authentication
// This will redirect the user to Google's OAuth 2.0 server
// where they can log in and authorize your app
// The scope can be adjusted based on what information you need
// e.g., profile, email, etc.
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google redirects here (must match redirect_uris in JSON)
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, isEnrolled: req.user.isEnrolled },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Decide where to redirect based on user flag
    if (!req.user.isEnrolled) {
      return res.redirect("http://localhost:5173/admission-form");
    }else{
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
    }
  }
);

export default router;

