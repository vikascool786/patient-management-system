import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://127.0.0.1:8000/api/";

const addDoctors = (
  name,
  email,
  phone,
  specialty,
  address
) => {
  return axios.post(
    API_URL + "doctors",
    {
      name,
      email,
      phone,
      specialty,
      address,
    },
    { headers: authHeader() }
  );
};

const updateDoctors = (
  id,
  name,
  email,
  phone,
  specialty,
  address
) => {
  return axios.put(
    API_URL + "doctors/"+id,
    {
      name,
      email,
      phone,
      specialty,
      address,
    },
    { headers: authHeader() }
  );
};

const getDoctors = () => {
  return axios.get(API_URL + "doctors", { headers: authHeader() });
};

const deleteDoctor = (id) => {
  return axios.delete(API_URL + "doctors/" + id, { headers: authHeader() });
};
const doctorService = {
  addDoctors,
  updateDoctors,
  getDoctors,
  deleteDoctor
};

export default doctorService;
