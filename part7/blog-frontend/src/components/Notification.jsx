import { useSelector } from "react-redux";

export const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: "1rem 0",
  };
  return notification ? <div style={style}>{notification}</div> : null;
};
