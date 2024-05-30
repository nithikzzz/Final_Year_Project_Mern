import React, { useState, useEffect } from "react";
import "./Userinfo.css";

const UserD = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/user/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/user/del/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the deleted user from the users state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="usercontainer">
        <div className="userrecord">
          <h2 className="userh2">All User Details</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : users.length > 0 ? (
            <table className="usertab">
              <thead className="userhead">
                <tr className="usertr">
                  <th className="userth">Name</th>
                  <th className="userth">Email</th>
                  <th className="userth">Authority</th>
                  <th className="userth">Phone Number</th>
                  <th className="userth">Password</th>
                  <th className="userth">Actions</th>
                </tr>
              </thead>
              <tbody className="usertablebody">
                {users.map((user) => (
                  <tr key={user._id} className="usertr">
                    <td className="usertd">{user.name}</td>
                    <td className="usertd">{user.email}</td>
                    <td className="usertd">{user.authority}</td>
                    <td className="usertd">{user.phno}</td>
                    <td className="usertd">{user.hashedPassword}</td>
                    <td className="usertd">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="userbtn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No user details found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserD;
