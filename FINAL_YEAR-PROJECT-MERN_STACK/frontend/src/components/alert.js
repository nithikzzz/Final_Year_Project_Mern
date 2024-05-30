import React, { useState, useEffect } from "react";
import axios from "axios";
import "./alert.css";
const AlertPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/alert/gett");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
      }
    };
    fetchNotifications();
  }, []);

  const handleAcknowledge = async (notificationId) => {
    try {
      await axios.delete(`/alert/dell/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== notificationId
        )
      );
      console.log("Notification removed successfully.");
    } catch (error) {
      console.error("Error removing notification:", error.message);
    }
  };

  return (
    <>
      <div className="alertcontainer">
        <div className="alertbox">
          <h2 className="alerttitle">Alert</h2>
          {notifications.length === 0 ? (
            <div className="alertmsg">
              <h3>No Notifications</h3>
              <p>There are no notifications to display.</p>
            </div>
          ) : (
            <div className="alertmsg">
              {notifications.map((notification) => (
                <div key={notification._id} style={{ color: "black" }}>
                  {notification.message}
                  <button
                    onClick={() => handleAcknowledge(notification._id)}
                    className="alertbtn"
                  >
                    OK
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlertPage;
