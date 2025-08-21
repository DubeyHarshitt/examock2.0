import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Student/dashboard';

const PageManager = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard/>} />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default PageManager