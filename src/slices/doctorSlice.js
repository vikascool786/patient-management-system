import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import doctorService from "../services/doctor.service";

const initialState = {
  loading: false,
  doctors: []
}


export const fetchDoctors = createAsyncThunk(
  "fetchDoctors",
  async (thunkAPI) => {
    try {
      const response = await doctorService.getDoctors();
      return { data: response.data.data };
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const addDoctor = createAsyncThunk(
  "addDoctor",
  async ({ name, email, phone, specialty, address }, thunkAPI) => {
    try {
      const response = await doctorService.addDoctors(name, email, phone, specialty, address);
      thunkAPI.dispatch(setMessage(response.data.message));
      // return response.data;
      return {data: response.data.data};
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


export const updateDoctor = createAsyncThunk(
  "updateDoctor",
  async ({ id, name, email, phone, specialty, address }, thunkAPI) => {
    try {
      const response = await doctorService.updateDoctors(id, name, email, phone, specialty, address);
      thunkAPI.dispatch(setMessage(response.data.message));
      // return response.data;
      return {data: response.data.data};
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


export const deleteDoctor = createAsyncThunk(
  "deleteDoctor",
  async ({ id }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setMessage(null));
      const response = await doctorService.deleteDoctor(id);
      thunkAPI.dispatch(setMessage(response.data.message));
      return {data: id};
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
const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchDoctors.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors = action.payload.data;
    })
    builder.addCase(fetchDoctors.rejected, (state, action) => {
      state.loading = false;
    })
    builder.addCase(addDoctor.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(addDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors.push(action.payload.data);
    })
    builder.addCase(addDoctor.rejected, (state, action) => {
      state.loading = false;
      state.doctors = [];
    })
    builder.addCase(updateDoctor.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(updateDoctor.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.doctors.findIndex((p) => p.id === action.payload.data.id);
      state.doctors[index] = action.payload.data;
    })
    builder.addCase(updateDoctor.rejected, (state, action) => {
      state.loading = false;
      state.doctors = [];
    })
    builder.addCase(deleteDoctor.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors = state.doctors.filter((p) => p.id !== action.payload.data);
    });
    builder.addCase(deleteDoctor.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

const { reducer } = doctorSlice;
export default reducer;