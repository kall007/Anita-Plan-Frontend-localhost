import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weeklyPlansPage.css";

const API_URL = "http://localhost:5005";

function WeeklyPlanPage() {
  const [user, setUser] = useState(null);
  const [popupActive, setPopupActive] = useState(false);
  const [newPlan, setNewPlan] = useState("");
  const [day, setDay] = useState("");

  const userId = localStorage.getItem("userId");

  const getName = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addWeek = async () => {
    try {
      const response = await axios.post(`${API_URL}/week`, {
        dayOfWeek: day,
        user: userId,
      });
      if (response) {
        alert("congratulationes you win");
      } else {
      }
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  const getDay = async () => {
    try {
      const res = await axios.get(`${API_URL}/week`);
      setDay(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div>
      <h1>{user && user.name}'s weekly plans</h1>
      <div className="calendar-container">
        <div className="week">
          <div className="monday">Monday</div>
          <div className="tuesday">Tuesday</div>
          <div className="wednesday">Wednesday</div>
          <div className="thursday">Thursday</div>
          <div className="friday">Friday</div>
          <div className="saturday">Saturday</div>
          <div className="sunday">Sunday</div>
        </div>
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive && (
        <div className="closePopup" onClick={() => setPopupActive(false)}>
          x
        </div>
      )}
      {popupActive && (
        <div className="form-content">
          <label>Choose a day:</label>
          <select
            onChange={(e) => {
              setDay(e.target.value);
              console.log(day);
            }}
            name="dayOfWeek"
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <input
            type="text"
            className="add-day-plan"
            onChange={(e) => setNewPlan(e.target.value)}
            value={newPlan}
          />
          <input
            type="text"
            className="add-day-plan"
            onChange={(e) => setNewPlan(e.target.value)}
            value={newPlan}
          />
          <div className="button" onClick={addWeek}>
            Plan day
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyPlanPage;
