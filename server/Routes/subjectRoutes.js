import selectSubjects from "../Controller/Subject.js";
import verifyOtp from "../Controller/VerifyOtp.js";
import express from "express";

const router = express.Router();

// router.post('/subject', selectSubjects);
// router.post('/send-otp', generateOTP)
router.post("/send-otp", selectSubjects);
router.post("/admission", verifyOtp);

export default router;
