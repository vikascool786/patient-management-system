import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//mui dates
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

///formik mui
const validationSchema = Yup.object({
  pName: Yup.string("Select patient name").required("patient is required"),
  pDoctor: Yup.string("Select doctor name").required("doctor is required"),
  pDate: Yup.string("Select Date").required("date is required"),
  pReason: Yup.string("Enter patient reason").required("reason is required"),
});

const MedicalRecordForm = ({ edit, editData, showHeader = true }) => {
  const { patients, loading: patientLoading } = useSelector(
    (state) => state.patients
  );
  const { doctors, loading: doctorLoading } = useSelector(
    (state) => state.doctors
  );
  const { appointments, loading: appontLoading } = useSelector(
    (state) => state.appointments
  );

  //formik
  const formik = useFormik({
    initialValues: {
      pName: null,
      pDoctor: null,
      pDate: dayjs(),
      pReason: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });


  const [rowsData, setRowsData] = useState([{
    medicine: '',
    dosageTime: '',
    dosageMeal: '',
    qty: ''
  }]);

  const addTableRows = () => {

    const rowsInput = {
      medicine: '',
      dosageTime: '',
      dosageMeal: '',
      qty: ''
    }
    setRowsData([...rowsData, rowsInput])

  }
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    console.log(rows);
    setRowsData(rows);
  }

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    console.log(rowsInput)
    setRowsData(rowsInput);
  }

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
                      <CardHeader title="Medical Record" />
                      <Divider />
                    </>
                  )}
                  <CardContent sx={{ pt: 3 }}>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
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
                          sm={6}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <Stack spacing={2}>
                            <InputLabel htmlFor="reason">Complaints</InputLabel>
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
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <Stack spacing={2}>
                            <InputLabel htmlFor="reason">Examination Findings</InputLabel>
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
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <Stack spacing={2}>
                            <InputLabel htmlFor="reason">Medical History</InputLabel>
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
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <Stack spacing={2}>
                            <InputLabel htmlFor="reason">diagnosis</InputLabel>
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
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <Stack spacing={2}>
                            <InputLabel htmlFor="reason">Instructions</InputLabel>
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
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          sx={{ m: "0 !important", pt: "10px !important" }}
                        >
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>

                                <TableRow>
                                  <TableCell>Medicine</TableCell>
                                  <TableCell>Dosage Time</TableCell>
                                  <TableCell>Dosage Meal</TableCell>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>
                                    <IconButton aria-label="delete" size="small" onClick={addTableRows}>
                                      <ControlPointIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowsData.map((data, index) => {
                                  const { medicine, dosageTime, dosageMeal, qty } = data;
                                  return (
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row" sx={{pr:0}}>
                                        <TextField
                                          margin="normal"
                                          fullWidth
                                          id="medicine"
                                          placeholder="medicine"
                                          name="medicine"
                                          size="small"
                                          sx={{ mt: "5px !important", width: '120px' }}
                                          onChange={(evnt)=>(handleChange(index, evnt))}
                                        value={medicine}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // error={
                                        //   formik.touched.pReason &&
                                        //   Boolean(formik.errors.pReason)
                                        // }
                                        // helperText={
                                        //   formik.touched.pReason && formik.errors.pReason
                                        // }
                                        />
                                      </TableCell>
                                      <TableCell sx={{pr:0}}>
                                        <Select
                                          labelId={`dosageMeal-${index}`}
                                          id={`dosageM-${index}`}
                                          name="dosageMeal"
                                          label=""
                                          onChange={(evnt)=>(handleChange(index, evnt))}
                                          size="small"
                                          value={dosageMeal}
                                          defaultValue="0"
                                          sx={{width: '120px', textAlign: 'left'}}
                                        >
                                          <MenuItem value="0">
                                            <em>None</em>
                                          </MenuItem>
                                          <MenuItem value={10}>Morning</MenuItem>
                                          <MenuItem value={20}>Afternoon</MenuItem>
                                          <MenuItem value={30}>Night</MenuItem>
                                          <MenuItem value={40}>Morning-Afternoon-Night</MenuItem>
                                          <MenuItem value={50}>Morning-Night</MenuItem>
                                        </Select>
                                      </TableCell>
                                      <TableCell sx={{pr:0}}>
                                        <Select
                                          labelId={`dosageTime-${index}`}
                                          id={`dosageT-${index}`}
                                          name="dosageTime"
                                          label=""
                                          onChange={(evnt)=>(handleChange(index, evnt))}
                                          size="small"
                                          value={dosageTime}
                                          defaultValue="0"
                                          sx={{width: '120px', textAlign: 'left'}}
                                        >
                                          <MenuItem value="0">None</MenuItem>
                                          <MenuItem value={10}>After Meal</MenuItem>
                                          <MenuItem value={20}>Before Meal</MenuItem>
                                          <MenuItem value={30}>No Meal</MenuItem>
                                        </Select>
                                      </TableCell>
                                      <TableCell sx={{pr:0, width: '50px'}}>
                                        <TextField
                                          margin="normal"
                                          fullWidth
                                          id="qty"
                                          placeholder="qty"
                                          name="qty"
                                          size="small"
                                          value={qty}
                                          sx={{ mt: "5px !important", width: '50px' }}
                                          onChange={(evnt)=>(handleChange(index, evnt))}
                                        // value={formik.values.pReason}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // error={
                                        //   formik.touched.pReason &&
                                        //   Boolean(formik.errors.pReason)
                                        // }
                                        // helperText={
                                        //   formik.touched.pReason && formik.errors.pReason
                                        // }
                                        />
                                      </TableCell>
                                      <TableCell sx={{pr:0}}>
                                        <IconButton aria-label="delete" size="small" onClick={() => deleteTableRows(index)}>
                                          <RemoveCircleOutlineIcon fontSize="small" />
                                        </IconButton>
                                      </TableCell>
                                    </TableRow>
                                  )})}
                              </TableBody>
                            </Table>
                          </TableContainer>
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

export default MedicalRecordForm;
