import { useState } from "react";
import styles from "./alert.module.css";
import { useEffect } from "react";
import { useRef } from "react";

export const Alert = ({ message, variant = "success" }) => {
  const [showAlert, setShowAlert] = useState(false);
  const timeoutId = useRef();

  useEffect(() => {
    if (!message) {
      setShowAlert(false);
      return;
    }
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setShowAlert(true);
    timeoutId.current = setTimeout(() => {
      setShowAlert(false);
    }, 3_000);
    return () => clearTimeout(timeoutId.current);
  }, [message]);

  if (!showAlert) return null;

  return (
    <div role="alert" className={[styles.alert, styles[variant]].join(" ")}>
      {message}
    </div>
  );
};
