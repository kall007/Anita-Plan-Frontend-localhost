import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signupPage.css";

const API_URL = "http://localhost:5005";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const reqBody = { email, password, name };

    axios
      .post(`${API_URL}/signup`, reqBody)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSignupSubmit}>
        <h3 className="sign-up">Sign Up</h3>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
          />
        </div>

        <div className="button-container">
          <button type="submit">Create Account</button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="link-container">
        <p className="already-account">Already have an account?</p>
        <Link to={"/"}>Log in</Link>
      </div>
    </div>
  );
}

export default SignupPage;
