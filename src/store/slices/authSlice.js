import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import { getAxiosInstance } from "../../api";

const initialState = {
  authDataStatus: "idle",
  authError: "idle",
  userData: {},
};
export const getUserData = createAsyncThunk(
  "getUserData",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post("login", params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    storeCurrentAuthData: (state, action) => {
      state.currentAuthData = action.payload.auth;
    },
  },
  extraReducers: {
    [getUserData.pending]: (state, action) => {
      state.authDataStatus = "loading";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.authDataStatus = "succeded";
      state.userData = action.payload?.data;
    },
    [getUserData.rejected]: (state, action) => {
      state.authDataStatus = "error";
      state.authError = action.payload?.password[0];
    },
  },
});
export const { currentAuthData, userData } = authSlice.actions;
export default authSlice.reducer;
