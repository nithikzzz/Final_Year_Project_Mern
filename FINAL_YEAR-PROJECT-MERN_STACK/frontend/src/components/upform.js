import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateWorkout = ({ match }) => {
  const { id } = match.params;
  const [workoutData, setWorkoutData] = useState({
    name: "",
    model: "",
    amount: 0,
    place: "",
    warranty_date: "",
    // Additional fields that might be present in some products
    issue: "",
    updatedAmount: "",
    updatedDate: "",
  });

  useEffect(() => {
    // Fetch existing workout details when the component mounts
    axios
      .get(`/datas/${id}`)
      .then((response) => setWorkoutData(response.data))
      .catch((error) =>
        console.error("Error fetching workout details:", error)
      );
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put(`/datas/${id}`, workoutData)
      .then((response) => {
        console.log("Workout updated successfully:", response.data);
        // Redirect or perform any other action upon successful update
      })
      .catch((error) => console.error("Error updating workout:", error));
  };

  return (
    <div>
      <h2>Update Workout</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={workoutData.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Model:
          <input
            type="text"
            name="model"
            value={workoutData.model}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={workoutData.amount}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Place:
          <input
            type="text"
            name="place"
            value={workoutData.place}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Warranty Date:
          <input
            type="date"
            name="warranty_date"
            value={workoutData.warentty_date}
            onChange={handleInputChange}
          />
        </label>

        {/* Additional fields that might be present in some products */}
        <label>
          Issue:
          <input
            type="text"
            name="issue"
            value={workoutData.issue}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Updated Amount:
          <input
            type="text"
            name="updatedAmount"
            value={workoutData.updatedAmount}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Updated Date:
          <input
            type="text"
            name="updatedDate"
            value={workoutData.updatedDate}
            onChange={handleInputChange}
          />
        </label>

        <button type="button" onClick={handleUpdate}>
          Update Workout
        </button>
      </form>
    </div>
  );
};

export default UpdateWorkout;
