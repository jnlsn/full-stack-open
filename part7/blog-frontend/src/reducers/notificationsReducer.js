import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const setNotification = (message, timeout = 2000) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.setNotification(message));
    setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification());
    }, timeout);
  };
};

export default notificationSlice.reducer;
