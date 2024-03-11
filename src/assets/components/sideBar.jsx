import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  return (
    <div>
      <div>placeholder image</div>
      <div>
        <p onClick={() => navigate(`/user:userId`)}>My Profile</p>
      </div>
      <div>
        <p onClick={() => navigate(`/plan`)}>Plans</p>
      </div>
      <div>
        <p onClick={() => navigate(`/calendars`)}>Calendar</p>
      </div>
      <div>
        <p onClick={() => navigate(`/about`)}>About Us</p>
      </div>
    </div>
  );
}

export default SideBar;
