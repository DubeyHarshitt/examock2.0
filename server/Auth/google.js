import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/User.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (user) {
          // Existing user
          return done(null, user);
        }

        // New user → create with onboarding flag
        const newUser = await User.create({
          email: email,
          name: profile.displayName,
          isEnrolled: false, // 👈 track if admission form completed
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user to store in session
// Serialize saves the user ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize finds the user by ID
// Deserialize retrieves the user from the session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
