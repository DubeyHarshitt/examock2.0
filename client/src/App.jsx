import React from 'react';
import './index.css';
import PageManager from './PageManager';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
        <PageManager />
      </div>
  )
}

export default App

