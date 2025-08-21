import express from 'express';
import connectDB from './DbConnection.js';
import cors from 'cors';
import googleRouter from './Routes/googleRoutes.js';
import './Auth/google.js'; // Ensure Google authentication is set up
import session from "express-session";  
import passport from "passport";


const app = express(); 
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5137', 
  credentials: true, 
}));

connectDB(); 

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  
}))

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());


// Define routes
app.use('/', googleRouter); // Use the Google authentication routes


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});