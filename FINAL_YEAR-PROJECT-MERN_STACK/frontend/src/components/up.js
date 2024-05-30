import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "./up.css";
import { useNotificationContext } from "../context/notificationContext";

const UpdateWorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { state: notificationState, dispatch: notificationDispatch } =
    useNotificationContext();
  const wannaSetLimit = true; // You should replace this with your logic
  //const limit = 10;
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    model: "",
    amount: "",
    count: "",
    place: "",
    warentty_date: "",
    issue: "",
    updatedAmount: "",
    updatedDate: "",
  });

  useEffect(() => {
    console.log("Fetching workout details for ID:", id);
    const fetchWorkoutDetails = async () => {
      try {
        const response = await axios.get(`/datas/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const { data } = response;
        console.log("Fetched workout details:", data);
        setFormData({
          name: data.name || "",
          model: data.model || "",
          amount: data.amount || "",
          count: data.count || "",
          place: data.place || "",
          warentty_date: data.warentty_date || "",
          issue: data.issue || "",
          updatedAmount: data.updatedAmount || "",
          updatedDate: data.updatedDate || "",
          limit: data.limit || "",
        });
      } catch (error) {
        console.error("Error fetching workout details:", error.message);
      }
    };

    fetchWorkoutDetails();
  }, [id, user.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const clearFormData = () => {
    // Reset form data to initial state or any desired empty state
    setFormData({
      name: "",
      model: "",
      amount: "",
      count: "",
      place: "",
      warentty_date: "",
      issue: "",
      updatedAmount: "",
      updatedDate: "",
      limit: "",
    });
  };
  const handleUpdateClick = async () => {
    try {
      const response = await axios.patch(`/datas/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("Response from server:", response);

      if (response.status === 200) {
        dispatch({ type: "UPDATE_WORKOUT", payload: formData });
        alert("Workout details updated successfully");

        // Check if deleting the workout would go below the limit
        console.log("Count:", formData.count);
        console.log("Limit:", formData.limit);
        if (wannaSetLimit && parseInt(formData.count, 10) <= formData.limit) {
          try {
            await axios.post("/alert/inss", {
              message: `The ${formData.name} is below the limit you set.`,
            });
            console.log("Notification added successfully.");
            clearFormData();
          } catch (error) {
            console.error("Error adding notification:", error.message);
          }
        }
      } else {
        // Handle non-200 status codes
        console.error("Error updating workout details:", response.statusText);
        alert("Error updating workout details. Please try again later.");
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Error updating workout details:", error.message);
      alert(
        "An error occurred while updating workout details. Please try again later."
      );
    }
  };

  return (
    <div className="updateWorkout">
      <div className="updatebox">
        <p className="updateh2">Update Product Details</p>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="upField"
        />
        <br />
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
          className="upField"
        />
        <br />
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          className="upField"
        />

        <br />
        <label htmlFor="count">Count:</label>
        <input
          type="text"
          id="count"
          name="count"
          value={formData.count}
          onChange={handleInputChange}
          className="upField"
        />
        <br />
        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={formData.place}
          onChange={handleInputChange}
          className="upField"
        />
        <br />
        <label htmlFor="warentty_date">Date:</label>
        <input
          type="text"
          id="warentty_date"
          name="warentty_date"
          value={formData.warentty_date}
          onChange={handleInputChange}
          className="upField"
        />
        <br />
        {formData.issue && (
          <div>
            <label htmlFor="issue">Issue:</label>
            <input
              type="text"
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleInputChange}
              className="upField"
            />
          </div>
        )}

        {formData.updatedAmount && (
          <div>
            <label htmlFor="updatedAmount">Updated Amount:</label>
            <input
              type="text"
              id="updatedAmount"
              name="updatedAmount"
              value={formData.updatedAmount}
              onChange={handleInputChange}
              className="upField date"
            />
          </div>
        )}

        {formData.updatedDate && (
          <div>
            <label htmlFor="updatedDate">Updated Date:</label>
            <input
              type="date"
              id="updatedDate"
              name="updatedDate"
              value={formData.updatedDate}
              onChange={handleInputChange}
              className="upField"
            />
          </div>
        )}
        {formData.limit && (
          <div>
            <label htmlFor="limit">limit:</label>
            <input
              type="number"
              id="limit"
              name="limit"
              value={formData.limit}
              onChange={handleInputChange}
              className="upField"
            />
          </div>
        )}

        <button type="button" onClick={handleUpdateClick} className="update">
          Update Workout
        </button>
      </div>
    </div>
  );
};

export default UpdateWorkoutForm;
