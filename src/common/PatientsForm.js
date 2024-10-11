import React, { useRef } from "react";
import { useDispatch } from "react-redux";
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
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import { addPatient, updatePatient } from "../slices/patientSlice";
//mui dates
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

///formik mui
const validationSchema = Yup.object({
  pName: Yup.string("Enter patient name").required("Patient Name is required"),
  pEmail: Yup.string("Enter Email")
    .email("Enter a valid email")
    .required("Email is required"),
  pPhone: Yup.string("Enter Phone")
    .min(10, "Enter Valid phone number")
    .required("Phone is required"),
  pDob: Yup.string("Select Date of birth").required(
    "Date of birth is required"
  ),
  pAddress: Yup.string("Enter patient address").required("address is required"),
});

const PatientsForm = (props) => {
  const dispatch = useDispatch();
  const { edit, editData } = props;
  //formik
  const autoC1 = useRef(null);
  const autoC2 = useRef(null);
  const formik = useFormik({
    initialValues: {
      pName: editData ? editData.name : "",
      pEmail: editData ? editData.email : "",
      pPhone: editData ? editData.phone : "",
      pDob: editData ? dayjs(editData.dob) : "",
      pAddress: editData ? editData.address : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, resetForm) => {
      handleSubmit(values);
      formik.resetForm();
    },
  });

  const handleSubmit = (formValue) => {
    const { pName, pEmail, pPhone, pDob, pAddress } = formValue;
    // console.log(editData.id)
    dispatch(
      edit ? updatePatient({
        id: editData.id,
        name: pName,
        email: pEmail,
        phone: pPhone,
        dob: dayjs(pDob).format("YYYY-MM-DD HH:mm:ss"),
        address: pAddress,
      }) : addPatient({
        name: pName,
        email: pEmail,
        phone: pPhone,
        dob: dayjs(pDob).format("YYYY-MM-DD HH:mm:ss"),
        address: pAddress,
      })
    )
      .unwrap()
      .then(() => {
        formik.resetForm({
          values: {
            pName: "",
            pEmail: "",
            pDob: "",
            pPhone: "",
            pAddress: "",
          },
        });
        const ele1 = autoC1.current.getElementsByClassName(
          "MuiAutocomplete-clearIndicator"
        )[0];
        const ele2 = autoC2.current.getElementsByClassName(
          "MuiAutocomplete-clearIndicator"
        )[0];
        if (ele2) ele2.click();
        if (ele1) ele1.click();
      })
      .catch(() => {});
  };

  return (
    <>
      <Box component="main">
        <Container maxWidth="lg" sx={{ p: "0 !important" }}>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container>
              <Grid item xs={12}>
                <Card sx={{ minWidth: 320, pt: 2 }}>
                  <CardContent>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <Stack spacing={2}>
                            <InputLabel htmlFor="Name">Patient Name</InputLabel>
                            <TextField
                              margin="normal"
                              fullWidth
                              id="pName"
                              placeholder="Patient Name"
                              name="pName"
                              size="small"
                              sx={{ mt: "5px !important" }}
                              value={formik.values.pName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.pName &&
                                Boolean(formik.errors.pName)
                              }
                              helperText={
                                formik.touched.pName && formik.errors.pName
                              }
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
                            <InputLabel htmlFor="Email">Email</InputLabel>
                            <TextField
                              margin="normal"
                              fullWidth
                              id="pEmail"
                              placeholder="Patient Email"
                              name="pEmail"
                              size="small"
                              sx={{ mt: "5px !important" }}
                              value={formik.values.pEmail}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.pEmail &&
                                Boolean(formik.errors.pEmail)
                              }
                              helperText={
                                formik.touched.pEmail && formik.errors.pEmail
                              }
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
                            <InputLabel htmlFor="Phone">Phone</InputLabel>
                            <TextField
                              margin="normal"
                              fullWidth
                              id="pPhone"
                              placeholder="Patient Phone"
                              name="pPhone"
                              size="small"
                              sx={{ mt: "5px !important" }}
                              value={formik.values.pPhone}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.pPhone &&
                                Boolean(formik.errors.pPhone)
                              }
                              helperText={
                                formik.touched.pPhone && formik.errors.pPhone
                              }
                            />
                          </Stack>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <InputLabel htmlFor="date">Date of birth</InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              onChange={(value) =>
                                formik.setFieldValue("pDob", value, true)
                              }
                              value={formik.values.pDob}
                              slotProps={{ textField: { size: "small" } }}
                              sx={{ width: "100%" }}
                              renderInput={(params) => (
                                <TextField
                                  error={Boolean(
                                    formik.touched.pDob && formik.errors.pDob
                                  )}
                                  helperText={
                                    formik.touched.pDob && formik.errors.pDob
                                  }
                                  margin="normal"
                                  name="pDob"
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
                            <InputLabel htmlFor="reason">Address</InputLabel>
                            <TextField
                              margin="normal"
                              fullWidth
                              id="pAddress"
                              placeholder="Patient Address"
                              name="pAddress"
                              size="small"
                              sx={{ mt: "5px !important" }}
                              value={formik.values.pAddress}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.pAddress &&
                                Boolean(formik.errors.pAddress)
                              }
                              helperText={
                                formik.touched.pAddress &&
                                formik.errors.pAddress
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

export default PatientsForm;
