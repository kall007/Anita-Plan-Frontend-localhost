import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication
  const [cookies, setCookie, removeCookie] = useCookies("token_id");
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    removeCookie("token_id");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false); // Update authentication state
    navigate("/");
  };

  return (
    <div className="navWrapper">
      <Link
        to="/plan"
        style={{ textDecoration: "none" }}
        className="CompanyName"
      >
        Anita-Plan
      </Link>
      <nav className="navContainer">
        <Link to="/weeklyPlan">Weekly Plan</Link>
        <Link to="/plan">Plans</Link>
        <Link to="/about">About</Link>

        {/* Conditional rendering based on authentication state */}
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/">Login</Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
