import { Link } from "react-router-dom";
import "./navbar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookie] = useCookies("token_id");
  const navigate = useNavigate();

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
        <Link to="/plan">Home</Link>
        <Link to="/about">About</Link>

        <button
          onClick={() => {
            setCookie("token_id", "");
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
            navigate("/");
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};
export default Navbar;
