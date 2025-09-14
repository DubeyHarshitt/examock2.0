import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Helper/ProtectedRoute';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Student/Dashboard';
import AdmissionForm from './Pages/AdmissionForm';
import Home from './Pages/Home';

const PageManager = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admission-form" element={ <AdmissionForm/>} />
      
      {/* Private Route */}
      <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />

      {/* Random Route */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default PageManager