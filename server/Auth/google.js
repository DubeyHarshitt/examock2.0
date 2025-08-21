import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/User.model.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback" // This should match the redirect URI in your Google Developer Console
},

async (accessToken, refreshToken, profile, done)=>{
    const existingUser = await User.findOne({ user_id: profile.id});
    if(existingUser) return done(null, existingUser);

    const newUser = await User.create({
        user_id: profile.id,
        email: profile.emails[0].value,
    });
    done(null, newUser);
    // done(err, user)
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

