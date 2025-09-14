// import React from "react";
// import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "./isAuthenticated";

// const ProtectedRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from query param when redirected from backend
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // Remove token from URL after saving it
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // Get token from storage
  const token = localStorage.getItem("token");

  if (!token) {
    // No token → redirect to login
    return <Navigate to="/login" replace />;
  }

  // ✅ User has token → allow access
  return children;
};

export default ProtectedRoute;
