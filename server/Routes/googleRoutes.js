import express from 'express';
import passport from 'passport';

const googleRouter = express.Router();

// Step 1: Initiate Google authentication
// This will redirect the user to Google's OAuth 2.0 server
// where they can log in and authorize your app
// The scope can be adjusted based on what information you need
// e.g., profile, email, etc.
googleRouter.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google redirects here (must match redirect_uris in JSON)
googleRouter.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // ✅ Send token or redirect to frontend
    res.redirect("http://localhost:5173?login=success");
  }
);

export default googleRouter;
