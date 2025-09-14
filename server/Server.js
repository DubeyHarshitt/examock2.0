import express from "express";
import connectDB from "./DbConnection.js";
import cors from "cors";
import "./Auth/google.js"; // Ensure Google authentication is set up
import session from "express-session";
import passport from "passport";

// Importing Routes
import googleAuth from "./Routes/googleRoutes.js";
import userAuth from "./Routes/authRoutes.js";
// import subjectSelection from './Routes/subjectRoutes.js';
import otpAuth from "./Routes/subjectRoutes.js";

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
connectDB();

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/", googleAuth); // Use the Google authentication routes
app.use("/api/auth", userAuth);
// app.use('/api', subjectSelection);
app.use("/api", otpAuth);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
