import * as React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

export const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        dispatch(
          loginUser({
            username: data.get("username"),
            password: data.get("password"),
          })
        );
      }}
    >
      <fieldset>
        <legend>Login</legend>
        <div>
          <label for="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
};
