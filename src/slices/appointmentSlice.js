import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import appointmentService from "../services/appointment.service";

const initialState = {
  loading: false,
  appointments: []
}


export const fetchAppointments = createAsyncThunk(
  "fetchAppointments",
  async (thunkAPI) => {
    try {
      const response = await appointmentService.getAppointments();
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

export const addAppointments = createAsyncThunk(
  "addAppointments",
  async ({ patient_id, doctor_id, appointment_date, reason }, thunkAPI) => {
    try {
      const response = await appointmentService.addAppointments(patient_id, doctor_id, appointment_date, reason);
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

export const updateAppointments = createAsyncThunk(
  "updateAppointments",
  async ({id, patient_id, doctor_id, appointment_date, reason }, thunkAPI) => {
    try {
      const response = await appointmentService.updateAppointments(id, patient_id, doctor_id, appointment_date, reason);
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

export const deleteAppointment = createAsyncThunk(
  "deleteAppointment",
  async ({ id }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setMessage(null));
      const response = await appointmentService.deleteAppointment(id);
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

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchAppointments.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload.data;
    })
    builder.addCase(fetchAppointments.rejected, (state, action) => {
      state.loading = false;
    })
    builder.addCase(addAppointments.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(addAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments.push(action.payload.data);
    })
    builder.addCase(addAppointments.rejected, (state, action) => {
      state.loading = false;
      state.appointments = null;
    })
    builder.addCase(updateAppointments.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(updateAppointments.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.appointments.findIndex((p) => p.id === action.payload.data.id);
      state.appointments[index] = action.payload.data;

      // state.loading = false;
      // const index = state.appointments.findIndex((p) => p.id === action.payload.data.id);
      // state.appointments.splice(index, 1);
      // state.appointments.push(action.payload.data)
    })
    builder.addCase(updateAppointments.rejected, (state, action) => {
      state.loading = false;
      // state.appointments = null;
    })
    builder.addCase(deleteAppointment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteAppointment.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = state.appointments.filter((p) => p.id !== action.payload.data);
    });
    builder.addCase(deleteAppointment.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

const { reducer } = appointmentSlice;
export default reducer;