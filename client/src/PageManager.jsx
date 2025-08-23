import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Student/dashboard';
import ProtectedRoute from './Helper/ProtectedRoute';

const PageManager = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Private Route */}
      <Route path="/" element={<ProtectedRoute> <div>Home</div> </ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />

      {/* Random Route */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default PageManager