import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // Formik, Field, Form, ErrorMessage,
  useFormik,
} from "formik";
import * as Yup from "yup";

//mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
//mui

import { fetchPatients } from "../slices/patientSlice";
import { addAppointments, fetchAppointments, updateAppointments } from "../slices/appointmentSlice";
//mui dates
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { fetchDoctors } from "../slices/doctorSlice";

///formik mui
const validationSchema = Yup.object({
  pName: Yup.string("Select patient name").required("patient is required"),
  pDoctor: Yup.string("Select doctor name").required("doctor is required"),
  pDate: Yup.string("Select Date").required("date is required"),
  pReason: Yup.string("Enter patient reason").required("reason is required"),
});

const AppointmentsForm = ({ edit, editData, showHeader = true }) => {
  const { patients, loading: patientLoading } = useSelector(
    (state) => state.patients
  );
  const { doctors, loading: doctorLoading } = useSelector(
    (state) => state.doctors
  );
  const { appointments, loading: appontLoading } = useSelector(
    (state) => state.appointments
  );
  const [patientNames, setPatientNames] = React.useState([]);
  const [doctorNames, setDoctorNames] = React.useState([]);
  const [appointNames, setAppointName] = React.useState([]);

  function getPatientMap(id) {
    const dMap = patients.filter((d) => d.id === +id).map((d) => ({ label: d.name, id: d.id }));
    return dMap[0];
  }
  function getDoctorsMap(id) {
    const dMap = doctors.filter((d) => d.id === +id).map((d) => ({ label: d.name, id: d.id }));
    return dMap[0];
  }
  //formik
  const autoC1 = useRef(null);
  const autoC2 = useRef(null);
  const formik = useFormik({
    initialValues: {
      pName: editData ? getPatientMap(editData.patient_id) : null,
      pDoctor: editData ? getDoctorsMap(editData.doctor_id) : null,
      pDate: editData ? dayjs(editData.appointment_date) : dayjs(),
      pReason: editData ? editData.reason : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  const handleSubmit = (formValue) => {
    const { pName, pDoctor, pDate, pReason } = formValue;
    // setLoading(true);
    dispatch(
      edit ?
      updateAppointments({
        id: editData.id,
        patient_id: pName,
        doctor_id: pDoctor,
        appointment_date: dayjs(pDate).format("YYYY-MM-DD HH:mm:ss"),
        reason: pReason,
      }) : addAppointments({
        patient_id: pName,
        doctor_id: pDoctor,
        appointment_date: dayjs(pDate).format("YYYY-MM-DD HH:mm:ss"),
        reason: pReason,
      })
    )
      .unwrap()
      .then(() => {
        const ele1 = autoC1.current.getElementsByClassName(
          "MuiAutocomplete-clearIndicator"
        )[0];
        const ele2 = autoC2.current.getElementsByClassName(
          "MuiAutocomplete-clearIndicator"
        )[0];
        if (ele2) ele2.click();
        if (ele1) ele1.click();
        formik.resetForm({
          values: {
            pName: null,
            pDoctor: "",
            pDate: dayjs(Date.now()),
            pReason: "",
          },
        });
      })
      .catch(() => {
        // setLoading(false);
        // const newState = { vertical: "top", horizontal: "center" };
        // setSnackState({ ...newState, open: true });
      });
  };
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const fetchDoctorsData = useCallback(async () => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const fetchAppointData = useCallback(async () => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (patients.length === 0) {
      fetchData();
    }
    if (doctors.length === 0) {
      fetchDoctorsData();
    }
    if (appointments.length === 0) {
      fetchAppointData();
    }
  }, []);

  useEffect(() => {
    if (patients.length > 0) {
      const allP = patients.map((p) => ({ label: p.name, id: p.id }));
      setPatientNames(allP);
    }
    if (doctors.length > 0) {
      const allD = doctors.map((p) => ({ label: p.name, id: p.id }));
      setDoctorNames(allD);
    }
    if (appointments.length > 0) {
      const allA = appointments.map((p) => ({ label: p.name, id: p.id }));
      setAppointName(allA);
    }
  }, [patients, doctors, appointments]);

  return (
    <>
      <Box component="main">
        <Container maxWidth="lg" sx={{ p: "0 !important" }}>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }}>
                  {showHeader && (
                    <>
                      <CardHeader
                        title="Book Appointment"
                        sx={
                          {
                            // '& span':{
                            //     fontSize: '16px'
                            // }
                          }
                        }
                      />
                      <Divider />
                    </>
                  )}
                  <CardContent sx={{pt: 3}}>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <Stack spacing={2}>
                            <InputLabel htmlFor="email">
                              Patient Name
                            </InputLabel>
                            <Autocomplete
                              id="pName"
                              ref={autoC1}
                              size="small"
                              getOptionLabel={(option) => option.label}
                              getOptionKey={(option) => option.id}
                              options={patientNames || []}
                              defaultValue={formik.values.pName}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onBlur={formik.handleBlur}
                                  name="pName"
                                  error={
                                    formik.touched.pName &&
                                    Boolean(formik.errors.pName)
                                  }
                                  helperText={
                                    formik.touched.pName && formik.errors.pName
                                  }
                                />
                              )}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              onChange={(e, value, reason) => {
                                formik.setFieldValue("pName", value?.id);
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <Stack spacing={2}>
                            <InputLabel htmlFor="email">Doctor Name</InputLabel>
                            <Autocomplete
                              id="pDoctor"
                              ref={autoC2}
                              size="small"
                              getOptionLabel={(option) => option.label}
                              getOptionKey={(option) => option.id}
                              options={doctorNames || []}
                              defaultValue={formik.values.pDoctor}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onBlur={formik.handleBlur}
                                  name="pDoctor"
                                  error={
                                    formik.touched.pDoctor &&
                                    Boolean(formik.errors.pDoctor)
                                  }
                                  helperText={
                                    formik.touched.pDoctor &&
                                    formik.errors.pDoctor
                                  }
                                />
                              )}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              onChange={(e, value, reason) => {
                                formik.setFieldValue("pDoctor", value?.id);
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <InputLabel htmlFor="date">Select Date</InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              onChange={(value) =>
                                formik.setFieldValue("pDate", value, true)
                              }
                              value={formik.values.pDate}
                              slotProps={{ textField: { size: "small" } }}
                              sx={{ width: "100%" }}
                              renderInput={(params) => (
                                <TextField
                                  error={Boolean(
                                    formik.touched.pDate && formik.errors.pDate
                                  )}
                                  helperText={
                                    formik.touched.pDate && formik.errors.pDate
                                  }
                                  margin="normal"
                                  name="pDate"
                                  variant="standard"
                                  fullWidth
                                  {...params}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <Stack spacing={2}>
                            <InputLabel htmlFor="reason">Reason</InputLabel>
                            <TextField
                              margin="normal"
                              fullWidth
                              id="pReason"
                              placeholder="Patient reason"
                              name="pReason"
                              size="small"
                              sx={{ mt: "5px !important" }}
                              value={formik.values.pReason}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.pReason &&
                                Boolean(formik.errors.pReason)
                              }
                              helperText={
                                formik.touched.pReason && formik.errors.pReason
                              }
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ float: "right" }}>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="flex-start"
                      spacing={2}
                      mx={1}
                      mb={2}
                    >
                      {/* <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                        color="inherit"
                      >
                        cancel
                      </Button> */}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {edit ? "Update" : "Add"}
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AppointmentsForm;
