import express from 'express';
import registerUser  from '../Auth/userAuth.js';

const router = express.Router();

// One form route → decides login/register automatically
router.post("/user", registerUser);

export default router;