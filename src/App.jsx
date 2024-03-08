import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./assets/pages/loginPage";
import SignupPage from "./assets/pages/signupPage";
import PlanPage from "./assets/pages/planPage";
import AboutPage from "./assets/pages/aboutPage";
import UserPage from "./assets/pages/userPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user:userId" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
