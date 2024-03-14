import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./loginPage.css";

const API_URL = "http://localhost:5005";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies("token_id");
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios
      .post(`${API_URL}/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        setCookie("token_id", response.data.userId);
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("userId", response.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/plan");
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={handleLoginSubmit}>
            <div className="email-field">
              <h1>Login</h1>
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="password-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <button className="button-container2">Log In</button>
          </form>
          <p className="no-account-yet">Dont have an account yet?</p>
          <Link to={"/signup"}> Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
