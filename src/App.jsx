import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import Router here

import { AuthProvider } from './services/authProvider';
import VerifyPage from './components/VerifyPage';
import LoginPage from './components/LoginPage';
import Register from './components/Register';
import SingerDashboard from './pages/SingerDashboard';
import SecretaryDashboard from './pages/SecretaryDashboard';
import DisciplinaryDashboard from './pages/DisciplinaryDashboard';

function App() {
  return (
    <AuthProvider>
    <Routes>
     <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/singer-dashboard" element={<SingerDashboard />} />
      <Route path="/secretary-dashboard" element={<SecretaryDashboard />} />
      <Route path="/disciplinary-dashboard" element={<DisciplinaryDashboard />} />
      <Route path="/" element={<LoginPage />} />
      
    </Routes>
    </AuthProvider>
  );
}

export default App;
