import { createContext, useContext, useEffect, useState } from "react";

export const NotificationContext = createContext({
  message: "",
  setNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const setNotification = (message, timeout = 1000) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, timeout);
  };

  return (
    <NotificationContext.Provider value={{ message, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const Notification = () => {
  const { message } = useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!message) return null;

  return <div style={style}>{message}</div>;
};
