import React, { createContext, useContext, useReducer, useEffect } from "react";

const NotificationContext = createContext();

const initialState = {
  notifications: [],
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const loadNotificationsFromStorage = () => {
  const storedNotifications = localStorage.getItem("notifications");
  return storedNotifications ? JSON.parse(storedNotifications) : [];
};

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Load notifications from local storage on component mount
  useEffect(() => {
    const storedNotifications = loadNotificationsFromStorage();
    dispatch({ type: "ADD_NOTIFICATION", payload: storedNotifications });
  }, []);

  // Update local storage when notifications change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(state.notifications));
  }, [state.notifications]);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};

export { NotificationProvider, useNotificationContext };
