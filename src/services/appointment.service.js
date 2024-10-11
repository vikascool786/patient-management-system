import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://127.0.0.1:8000/api/";

const addAppointments = (
  patient_id,
  doctor_id,
  appointment_date,
  reason,
  address
) => {
  return axios.post(
    API_URL + "appointments",
    {
      patient_id,
      doctor_id,
      appointment_date,
      reason,
      address,
    },
    { headers: authHeader() }
  );
};

const updateAppointments = (
  id,
  patient_id,
  doctor_id,
  appointment_date,
  reason,
  address
) => {
  return axios.put(
    API_URL + "appointments/"+id,
    {
      patient_id,
      doctor_id,
      appointment_date,
      reason,
      address,
    },
    { headers: authHeader() }
  );
};

const getAppointments = () => {
  return axios.get(API_URL + "appointments", { headers: authHeader() });
};

const deleteAppointment = (id) => {
  return axios.delete(API_URL + "appointments/" + id, { headers: authHeader() });
};

const appointmentService = {
  addAppointments,
  updateAppointments,
  getAppointments,
  deleteAppointment,
};

export default appointmentService;
