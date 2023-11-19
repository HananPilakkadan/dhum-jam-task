import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import dashboardSlice from "./slices/dashboardSlice";

const appReducer = combineReducers({
  login: authSlice,
  dashboard: dashboardSlice,
});

export default appReducer;
