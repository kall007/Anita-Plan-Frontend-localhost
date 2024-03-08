import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

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
        //storeToken(response.data.authToken);
        //authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <label>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
          <button>Log In</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Dont have an account yet?</p>
        <Link to={"/signup"}> Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
