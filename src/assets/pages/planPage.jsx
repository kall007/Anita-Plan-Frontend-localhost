import axios from "axios";
import React, { useState, useEffect } from "react";
import "./planPage.css";
import { useCookies } from "react-cookie";

const API_URL = "http://localhost:5005";

function PlanPage() {
  const [cookies, setCookie] = useCookies("token_id");
  const [plans, setPlans] = useState(null);
  const [popupActive, setPopupActive] = useState(false);
  const [newPlan, setNewPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const getPlans = async () => {
    try {
      const res = await axios.get(`${API_URL}/plans`);
      setPlans(res.data.plans);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPlans();
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
    } catch (error) {
      console.error("Error completing plan:", error);
    }
  };

  const deletePlan = async (id) => {
    try {
      await axios.delete(`${API_URL}/plans/delete/${id}`);
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const addPlan = async () => {
    try {
      const response = await axios.post(`${API_URL}/plans/new`, {
        text: newPlan,
      });
      const data = response.data;
      setPlans([...plans, data]);
      setPopupActive(false);
      setNewPlan("");
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  return (
    <div className="body">
      <h1>Welcome User</h1>
      <h4>Your plans</h4>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="plans">
          {plans &&
            plans.map((plan) => {
              return (
                <div
                  className={"plan" + (plan.complete ? " is-complete" : "")}
                  key={plan._id}
                  onClick={() => completePlan(plan._id)}
                >
                  <div className="checkbox"></div>
                  <div className="text">{plan.text}</div>
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
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default PlanPage;
