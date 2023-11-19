import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import { getAxiosInstance } from "../../api";

const initialState = {
  userDetails: {},
  authDataStatus: {},
  newData: {},
};

export const currentUserData = createAsyncThunk(
  "currentUserData",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateData = createAsyncThunk(
  "updateData",
  async (id, data, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.put(id, { data });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    storeCurrentAuthData: (state, action) => {
      state.userDetails = action.payload.auth; // Fix: Use state.userDetails
    },
  },
  extraReducers: {
    [currentUserData.pending]: (state, action) => {
      state.authDataStatus = "loading";
    },
    [currentUserData.fulfilled]: (state, action) => {
      state.authDataStatus = "succeeded";
      state.userDetails = action.payload?.data?.data;
    },
    [currentUserData.rejected]: (state, action) => {
      state.authDataStatus = "error";
    },
    [updateData.pending]: (state, action) => {
      state.authDataStatus = "loading";
    },
    [updateData.fulfilled]: (state, action) => {
      state.authDataStatus = "succeeded";
      state.newData = action.payload?.data?.data;
    },
    [updateData.rejected]: (state, action) => {
      state.authDataStatus = "error";
    },
  },
});

export const { userDetails, authDataStatus, newData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
