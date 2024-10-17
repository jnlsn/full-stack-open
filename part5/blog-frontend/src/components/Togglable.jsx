import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button aria-controls="tog" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div id="tog" aria-expanded={visible} style={showWhenVisible}>
        {props.children}
        <button aria-controls="tog" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default Togglable;
