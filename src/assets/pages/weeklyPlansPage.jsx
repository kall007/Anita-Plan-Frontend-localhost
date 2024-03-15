import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weeklyPlansPage.css";
import { useNavigate } from "react-router-dom";

const API_URL = "https://anita-plan-api.adaptable.app/";

function WeeklyPlanPage() {
  const [user, setUser] = useState(null);
  const [popupActive, setPopupActive] = useState(false);
  const [newPlan, setNewPlan] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [showItems, setShowItems] = useState(false);

  const userId = localStorage.getItem("userId");

  const getName = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/${userId}`);
      const user = res.data;
      setUser(user);

      const userPlan = user.plan.map((item) => ({
        item,
      }));

      setNewPlan(userPlan);
    } catch (err) {
      console.log(err);
    }
  };
  const getWeeks = async () => {
    try {
      const res = await axios.get(`${API_URL}/week`);
      setItems(res.data.weeks);
    } catch (err) {
      console.error("Error fetching weeks:", err);
    }
  };

  const addWeek = async () => {
    try {
      if (!selectedPlan) {
        alert("please select a plan.");
      }
      const response = await axios.post(`${API_URL}/week`, {
        dayOfWeek: dayOfWeek,
        plan: selectedPlan,
        user: userId,
      });
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  useEffect(() => {
    getName();
    getWeeks();
  }, []);
  
  const MONDAY =
    items &&
    items.filter((e) => {
      return e.dayOfWeek === "Monday";
    });
  const TUESDAY =
    items &&
    items.filter((e) => {
      return e.dayOfWeek === "Tuesday";
    });
  const WEDNESDAY =
    items &&
    items.filter((e) => {
      return e.dayOfWeek === "Wednesday";
    });
  const THURSDAY =
    items &&
    items.filter((e) => {
      return e.dayOfWeek === "Wednesday";
    });
  const FRIDAY =
    items &&
    items.filter((e) => {
      return e.dayOfWeek === "Friday";
    });
  const SATURDAY =
    items &&
    items.filter((e) => {
      return e.dayOfWeek === "Saturday";
    });
  const SUNDAY =
    items &&
    items.filter((e) => {
      return e.dayOfWeek === "Sunday";
    });
  const displayItems = (day) => {
    setShowItems(day);
  };
  return (
    <div>
      <h1>{user && user.name}'s weekly plans</h1>
      <div className="calendar-container">
        <div className="week">
          <div
            className="monday"
            onClick={() => {
              displayItems("monday");
            }}
          >
            Monday
          </div>
          {showItems === "monday" &&
            MONDAY &&
            MONDAY.map((item) => {
              return item.plan && item.plan.length > 0
                ? item.plan.map((e, index) => {
                    return <div key={index}>{`${e}`}</div>;
                  })
                : null;
            })}
          <div
            className="tuesday"
            onClick={() => {
              displayItems("tuesday");
            }}
          >
            Tuesday
          </div>
          {showItems === "tuesday" &&
            TUESDAY &&
            TUESDAY.map((item) => {
              return item.plan && item.plan.length > 0
                ? item.plan.map((e, index) => {
                    return <div key={index}>{`${e}`}</div>;
                  })
                : null;
            })}
          <div
            className="wednesday"
            onClick={() => {
              displayItems("wednesday");
            }}
          >
            Wednesday
          </div>
          {showItems === "wednesday" &&
            WEDNESDAY &&
            WEDNESDAY.map((item) => {
              return item.plan && item.plan.length > 0
                ? item.plan.map((e, index) => {
                    return <div key={index}>{`${e}`}</div>;
                  })
                : null;
            })}
          <div
            className="thursday"
            onClick={() => {
              displayItems("thursday");
            }}
          >
            Thursday
          </div>
          {showItems === "thursday" &&
            THURSDAY &&
            THURSDAY.map((item) => {
              return item.plan && item.plan.length > 0
                ? item.plan.map((e, index) => {
                    return <div key={index}>{`${e}`}</div>;
                  })
                : null;
            })}
          <div
            className="friday"
            onClick={() => {
              displayItems("friday");
            }}
          >
            Friday
          </div>
          {showItems === "friday" &&
            FRIDAY &&
            FRIDAY.map((item) => {
              return item.plan && item.plan.length > 0
                ? item.plan.map((e, index) => {
                    return <div key={index}>{`${e}`}</div>;
                  })
                : null;
            })}
          <div
            className="saturday"
            onClick={() => {
              displayItems("saturday");
            }}
          >
            Saturday
          </div>
          {showItems === "saturday" &&
            SATURDAY &&
            SATURDAY.map((item) => {
              return item.plan && item.plan.length > 0
                ? item.plan.map((e, index) => {
                    return <div key={index}>{`${e}`}</div>;
                  })
                : null;
            })}
          <div
            className="sunday"
            onClick={() => {
              displayItems("sunday");
            }}
          >
            Sunday
          </div>
          {showItems === "sunday" &&
            SUNDAY &&
            SUNDAY.map((item) => {
              return item.plan && item.plan.length > 0
                ? item.plan.map((e, index) => {
                    return <div key={index}>{`${e}`}</div>;
                  })
                : null;
            })}
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
              setDayOfWeek(e.target.value);
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
          <label>Choose a plan:</label>
          <select
            onChange={(e) => {
              setSelectedPlan(e.target.value);
            }}
            name="dayOfWeek"
          >
            {newPlan.map((plan, index) => (
              <option key={index} value={plan.item}>
                {plan.item}
              </option>
            ))}
          </select>

          <div
            className="button"
            onClick={() => {
              addWeek();
              getWeeks();
            }}
          >
            Plan day
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyPlanPage;
