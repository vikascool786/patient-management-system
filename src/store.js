import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import patientsReducer from "./slices/patientSlice";
import messageReducer from "./slices/message";
import appointmentReducer from "./slices/appointmentSlice"
import doctorReducer from "./slices/doctorSlice"

const reducer = {
  auth: authReducer,
  message: messageReducer,
  patients: patientsReducer,
  appointments: appointmentReducer,
  doctors: doctorReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;