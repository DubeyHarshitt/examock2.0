import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdmissionForm = () => {
  const [examType, setExamType] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  // ✅ Function to request OTP
  const handleSendOtp = async () => {
    if (!email || !mobile || !examType) {
      toast.error("Please fill email, exam type and mobile number first");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/send-otp", {
        email,
        mobile,
        examType,
      });

      toast.success(res.data.message || "OTP sent successfully");
      setIsOtpSent(true);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  // ✅ Function to submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/admission", {
        email,
        mobile,
        examType,
        otp,
      });
      toast.success(res.data.message);

      // ✅ Reset form after successful submission
      setEmail("");
      setMobile("");
      setExamType("");
      setOtp("");
      setIsOtpSent(false);
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error submitting form");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admission Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Exam Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Exam Type
            </label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">--Select Exam--</option>
              <option value="jee">JEE</option>
              <option value="neet">NEET</option>
              <option value="gate">GATE</option>
              <option value="CET-PCB">CET-PCB</option>
              <option value="CET-PCM">CET-PCM</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter 10-digit number"
                pattern="[0-9]{10}"
                required
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
              >
                Send OTP
              </button>
            </div>
          </div>

          {/* OTP */}
          {isOtpSent && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
