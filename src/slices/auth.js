import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(name, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    })
    builder.addCase(register.rejected, (state, action) => {
      state.isLoggedIn = false;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    })
  },
  // extraReducers: {
  //   [register.fulfilled]: (state, action) => {
  //     state.isLoggedIn = false;
  //   },
  //   [register.rejected]: (state, action) => {
  //     state.isLoggedIn = false;
  //   },
  //   [login.fulfilled]: (state, action) => {
  //     state.isLoggedIn = true;
  //     state.user = action.payload.user;
  //   },
  //   [login.rejected]: (state, action) => {
  //     state.isLoggedIn = false;
  //     state.user = null;
  //   },
  //   [logout.fulfilled]: (state, action) => {
  //     state.isLoggedIn = false;
  //     state.user = null;
  //   },
  // },
});

const { reducer } = authSlice;
export default reducer;