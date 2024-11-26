import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationsReducer";

const userSlice = createSlice({
  name: "user",
  initialState: window.localStorage.getItem("loggedAppUser")
    ? JSON.parse(window.localStorage.getItem("loggedAppUser"))
    : null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const res = await fetch("/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (res.status !== 200) {
        throw new Error("unauthorized");
      }

      const user = await res.json();
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
      dispatch(userSlice.actions.setUser(user));
    } catch {
      dispatch(setNotification("could not sign in"));
    }
  };
};

export const logoutUser = () => {
  window.localStorage.removeItem("loggedAppUser");
  return async (dispatch) => {
    dispatch(userSlice.actions.clearUser());
  };
};

export default userSlice.reducer;
