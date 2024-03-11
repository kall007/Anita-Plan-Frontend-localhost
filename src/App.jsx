import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./assets/pages/loginPage";
import SignupPage from "./assets/pages/signupPage";
import PlanPage from "./assets/pages/planPage";
import ErrorPage from './pages/ErrorPage';
import UserPage from "./assets/pages/userPage";
import SideBar from "./assets/components/sideBar";
import CalendarPage from "./assets/pages/calendarPage";
import Modal from "react-modal";
import About from "./pages/About";

Modal.setAppElement("#root");

function App() {
  return (
    <div className="App">
      {window.location.pathname !== "/" ? <SideBar /> : ""}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/user:userId" element={<UserPage />} />
        <Route path="/calendars" element={<CalendarPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
