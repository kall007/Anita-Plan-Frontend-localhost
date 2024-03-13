import React, { useState, useEffect } from "react";
import axios from "axios";
import "./planPage.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function PlanPage() {
  const [cookies, setCookie] = useCookies("token_id");
  const [plans, setPlans] = useState(null);
  const [popupActive, setPopupActive] = useState(false);
  const [newPlan, setNewPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [editPlanId, setEditPlanId] = useState(null);
  const [editedPlanText, setEditedPlanText] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const getName = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPlans = async () => {
    try {
      const res = await axios.get(`${API_URL}/plans`);
      if (res) {
        const filterPlans = res.data.filter((e) => {
          if (e.user && e.user._id === userId) {
            return e;
          }
        });
        setPlans(filterPlans);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPlans();
    getName();
  }, []);

  const completePlan = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/plans/complete/${id}`);
      const data = response.data;
      setPlans((plans) =>
        plans.map((plan) => {
          if (plan._id === data._id) {
            plan.complete = data.complete;
          }
          return plan;
        })
      );
      getPlans();
    } catch (error) {
      console.error("Error completing plan:", error);
    }
  };

  const deletePlan = async (id) => {
    try {
      await axios.delete(`${API_URL}/plans/delete/${id}`);
      getPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const addPlan = async () => {
    try {
      const response = await axios.post(`${API_URL}/plans/new`, {
        text: newPlan,
        user: userId,
      });
      const data = response.data;
      setPopupActive(false);
      setNewPlan("");
      getPlans();
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  const editPlan = async (id) => {
    try {
      await axios.put(`${API_URL}/plans/update/${id}`, {
        text: editedPlanText,
      });
      setEditPlanId(null);
      setEditedPlanText("");
      getPlans();
    } catch (error) {
      console.error("Error editing plan:", error);
    }
  };

  const cancelEdit = () => {
    setEditPlanId(null);
    setEditedPlanText("");
  };

  return (
    <div className="body">
      <h1>Welcome {user && user.name}</h1>
      <h4>Your plans</h4>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="plans">
          {plans &&
            plans.map((plan) => {
              console.log("editPlanId:", editPlanId);
              console.log("plan._id:", plan._id);
              return (
                <div
                  className={"plan" + (plan.complete ? " is-complete" : "")}
                  key={plan._id}
                  onClick={() => completePlan(plan._id)}
                >
                  <div className="checkbox"></div>
                  {editPlanId === plan._id ? (
                    <input
                      type="text"
                      value={editedPlanText}
                      onChange={(e) => setEditedPlanText(e.target.value)}
                      autoFocus
                      onBlur={() => editPlan(plan._id)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          editPlan(plan._id);
                        }
                      }}
                    />
                  ) : (
                    <div className="text">{plan.text}</div>
                  )}
                  {editPlanId === plan._id ? (
                    <button onClick={() => editPlan(plan._id)}>Submit</button>
                  ) : (
                    <div
                      className="edit-plan"
                      onClick={() => {
                        setEditPlanId(plan._id);
                        setEditedPlanText(plan.text);
                      }}
                    >
                      Edit
                    </div>
                  )}
                  <div
                    className="delete-plan"
                    onClick={() => deletePlan(plan._id)}
                  >
                    x
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive && (
        <div className="closePopup" onClick={() => setPopupActive(false)}>
          x
        </div>
      )}
      {popupActive && (
        <div className="content">
          <h3>Add Plan</h3>
          <input
            type="text"
            className="add-plan-input"
            onChange={(e) => setNewPlan(e.target.value)}
            value={newPlan}
          />
          <div className="button" onClick={addPlan}>
            Create Plan
          </div>
        </div>
      )}
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
    </div>
  );
}

export default PlanPage;
