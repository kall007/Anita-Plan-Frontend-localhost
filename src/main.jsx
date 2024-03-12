import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Router>
  </React.StrictMode>
);
