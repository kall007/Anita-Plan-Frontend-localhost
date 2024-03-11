import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-datetime/css/react-datetime.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthWrapper } from "../src/context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </Router>
  </React.StrictMode>
);
