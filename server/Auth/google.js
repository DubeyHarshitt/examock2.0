// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../Models/User.model.js";

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/google/callback" // This should match the redirect URI in your Google Developer Console
// },

// async (accessToken, refreshToken, profile, done)=>{
    
//     const email = profile.emails[0].value;
//     const existingUser = await User.findOne({ email });

//     if(existingUser) return done(null, existingUser);

//     if(existingUser){
//         // attach a flag so we know it’s first time
//         user._isNew = true;
//     }else{
//         user._isNew = true;
//     }

//     const newUser = await User.create({
//         // user_id: profile.id,
//         email: profile.emails[0].value,
//         // isOnboarded: false, // flag for first-time check
//     });

//     done(null, newUser);
//     // done(err, user)
// }
// ));

// // Serialize user to store in session
// // Serialize saves the user ID in the session
// passport.serializeUser((user, done)=>{
//     done(null, user.id);
// })

// // Deserialize finds the user by ID 
// // Deserialize retrieves the user from the session
// passport.deserializeUser((id, done)=>{
//     User.findById(id).then(user => done(null, user));
// })

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/User.model.js";

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      if (user) {
        // Existing user → mark as not new
        user._isNew = false;
        return done(null, user);
      }

      // New user → create and mark as new
      const newUser = await User.create({
        email: profile.emails[0].value,
        isOnboarded: false, // optional field for tracking onboarding
      });
      newUser._isNew = true;

      return done(null, newUser);

    } catch (err) {
      return done(err, null);
    }
  }
));

// Serialize user to store in session
// Serialize saves the user ID in the session
passport.serializeUser((user, done)=>{
    done(null, user.id);
})

// Deserialize finds the user by ID 
// Deserialize retrieves the user from the session
passport.deserializeUser((id, done)=>{
    User.findById(id).then(user => done(null, user));
})
