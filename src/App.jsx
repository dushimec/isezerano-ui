import React, { useState } from "react";
import { Route, Routes } from "react-router-dom"; // No need to import Router here

import { AuthProvider } from "./services/authProvider";
import VerifyPage from "./components/VerifyPage";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import SingerDashboard from "./pages/SingerDashboard";
// import DisciplinaryDashboard from "./components/DisciplinaryDashboard";
import DisciplinaryDashboard from "./pages/DisciplinaryDashboard";

// import SecretaryDashboard from "./pages/SecretaryDashboard";
import SecretaryDashboard from "./pages/SecretaryDashboard";
import Loginuser from "./components/Loginuser";
import Popup from "./components/disciplinary/PopupDisciplinary/Popup";
import Claim from "./components/disciplinary/Claim/Claim";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <AuthProvider>
      <Popup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/singer-dashboard" element={<SingerDashboard />} />
        <Route path="/secretarydashboard" element={<SecretaryDashboard />} />
        <Route
          path="/disciplinarydashboard"
          element={<DisciplinaryDashboard />}
        />
        <Route path="/" element={<Loginuser />} />
        <Route path="/claim" element={<Claim />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
