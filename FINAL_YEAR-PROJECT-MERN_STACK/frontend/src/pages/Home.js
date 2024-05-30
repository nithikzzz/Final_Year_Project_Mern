// Home.js
import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import WorkoutDetails from "../components/WorkoutDetails";

import "./Home.css";

const Home = ({ searchQuery }) => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  // search
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  useEffect(() => {
    // search
    if (!searchQuery) {
      // If search query is empty, show all workouts
      setFilteredWorkouts(workouts);
    } else {
      // Filter workouts based on search query
      const filtered = workouts.filter((workout) =>
        workout.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredWorkouts(filtered);
    }

    // search

    const fetchWorkouts = async () => {
      const response = await fetch("/datas", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user, workouts, searchQuery]);

  return (
    <>
      <div className="homecontain">
        <div className="home">
          {filteredWorkouts &&
            filteredWorkouts.map((workout) => (
              <WorkoutDetails workout={workout} key={workout._id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
