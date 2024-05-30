import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

export const getUserAuthority = async (email) => {
  const userEmail = email;
  console.log(email);
  try {
    const response = await axios.get(`/user/email/${email}`);
    if (!response.data) {
      throw new Error("User not found");
    }
    return response.data.authority;
  } catch (error) {
    console.error("Error fetching user authority:", error);
    return <div>{/* <UserDetail emailid={userEmail} /> */}</div>;
  }
};

const UserDetail = ({ email }) => {
  console.log(email);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(email);
        const response = await axios.get(`/user/email/${email}`);

        if (!response.data) {
          throw new Error("User not found");
        }

        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserDetails();
    }
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(`/user/up/${email}`, user); // Pass the updated user object as data
      console.log("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <>
      <div className="container">
        {/* Render error message if there's an error */}
        {error && <div>Error: {error}</div>}
        {/* Render user details only when user is available */}
        {user && (
          <div className="box">
            <h2 className="ph2">User Details</h2>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="info"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={user.email}
                disabled
                className="info"
              />
            </div>
            <div>
              <label htmlFor="authority">authority:</label>
              <input
                type="text"
                id="authority"
                name="authority"
                value={user.authority}
                disabled
                className="info"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="info"
              />
            </div>
            <div>
              <label htmlFor="phno">Mobile No:</label>
              <input
                type="text"
                id="phno"
                name="phno"
                value={user.phno}
                onChange={handleInputChange}
                className="info"
              />
            </div>
            <button onClick={handleSave} className="save">
              {" "}
              Save
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;
