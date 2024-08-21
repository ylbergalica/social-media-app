import React , { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Nav/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <App />
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
);