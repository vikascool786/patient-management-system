import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import patientService from "../services/patient.service";

const initialState = {
  loading: false,
  patients: [],
};

// export const fetchPatients = createAsyncThunk('fetchPatients', async () => {
//   const response = await patientService.getPatients();
//   return response.data.data
// })

export const fetchPatients = createAsyncThunk(
  "fetchPatients",
  async (thunkAPI) => {
    try {
      const response = await patientService.getPatients();
      return { data: response.data.data };
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

export const addPatient = createAsyncThunk(
  "addPatient",
  async ({ name, email, phone, dob, address }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setMessage(null));
      const response = await patientService.addPatient(
        name,
        email,
        phone,
        dob,
        address
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      // return response.data;
      return { data: response.data.data };
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

export const updatePatient = createAsyncThunk(
  "updatePatient",
  async ({ id, name, email, phone, dob, address }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setMessage(null));
      const response = await patientService.updatePatient(
        id,
        name,
        email,
        phone,
        dob,
        address
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      // return response.data;
      return { data: response.data.data };
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

export const deletePatient = createAsyncThunk(
  "deletePatient",
  async ({ id }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setMessage(null));
      const response = await patientService.deletePatient(id);
      thunkAPI.dispatch(setMessage(response.data.message));
      return { data: id };
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

export const getPatientHistoryById = createAsyncThunk(
  "getPatientHistoryById",
  async ({ id }, thunkAPI) => {
    try {
      const response = await patientService.getPatientHistoryById(id);
      return { data: response.data.data };
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
const patientSlice = createSlice({
  name: "patient",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.loading = false;
      state.patients = action.payload.data;
    });
    builder.addCase(fetchPatients.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addPatient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.loading = false;
      state.patients.push(action.payload.data);
    });
    builder.addCase(addPatient.rejected, (state, action) => {
      state.loading = false;
      state.patients = [];
    });
    builder.addCase(updatePatient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.patients.findIndex(
        (p) => p.id === action.payload.data.id
      );
      state.patients[index] = action.payload.data;
    });
    builder.addCase(updatePatient.rejected, (state, action) => {
      state.loading = false;
      state.patients = [];
    });
    builder.addCase(deletePatient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.loading = false;
      state.patients = state.patients.filter((p) => p.id !== action.payload.data);
      // const index = state.patients.findIndex(
      //   (p) => p.id !== action.payload.data
      // );
      // state.patients.splice(index, 1);
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getPatientHistoryById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPatientHistoryById.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getPatientHistoryById.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

const { reducer } = patientSlice;
export default reducer;
