import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { Link } from "react-router";

import styles from "./navigation.module.css";

export const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <nav className={styles.nav}>
      <ul>
        {user && <li>Welcome, {user.name}.</li>}
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {user && (
          <li>
            <button onClick={logout}>logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
