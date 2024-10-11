import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://127.0.0.1:8000/api/";

const addPatient = (name, email, phone, dob, address) => {
  return axios.post(
    API_URL + "patients",
    {
      name,
      email,
      phone,
      dob,
      address,
    },
    { headers: authHeader() }
  );
};

const deletePatient = (id) => {
  return axios.delete(API_URL + "patients/" + id, { headers: authHeader() });
};

const updatePatient = (id, name, email, phone, dob, address) => {
  return axios.put(
    API_URL + "patients/" + id,
    {
      name,
      email,
      phone,
      dob,
      address,
    },
    { headers: authHeader() }
  );
};

const getPatients = () => {
  return axios.get(API_URL + "patients", { headers: authHeader() });
};

const getPatientHistoryById = (id) => {
  return axios.get(API_URL + "patients/history/" + id, {
    headers: authHeader(),
  });
};

const patientService = {
  addPatient,
  getPatients,
  deletePatient,
  updatePatient,
  getPatientHistoryById,
};

export default patientService;
