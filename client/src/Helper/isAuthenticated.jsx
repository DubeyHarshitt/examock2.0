import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("Access Token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // Check if expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("Access Token"); // cleanup expired token
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
