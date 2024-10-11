import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";

//mui
import { Box, Link } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../common/Chart";
import Deposits from "../common/Deposits";
import Orders from "../common/Orders";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import AppointmentsForm from "../common/AppointmentsForm";

export default function Dashboard() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { patients, loading: patientLoading } = useSelector(
    (state) => state.patients
  );
  const { doctors, loading: doctorLoading } = useSelector(
    (state) => state.doctors
  );
  const { appointments, loading: appointLoading } = useSelector(
    (state) => state.appointments
  );
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid container spacing={3} sx={{ display: "flex" }}>
              <Grid item xs={12} md={4} lg={4} sx={{ display: "flex" }}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography color="text.primary" variant="h5">
                      Appointments
                    </Typography>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
                      <div>
                        <Link
                          component="button"
                          onClick={() => {
                            navigate("/appointments");
                          }}
                          sx={{ textDecoration: "none" }}
                        >
                          <Typography variant="h5" component="h5">
                            {appointments.length}
                          </Typography>
                        </Link>
                        <Typography variant="body2" component="p">
                          Today's Appointment
                        </Typography>
                      </div>
                      <div>
                        <Link
                          component="button"
                          onClick={() => {
                            navigate("/appointments");
                          }}
                          sx={{ textDecoration: "none" }}
                        >
                          <Typography variant="h5" component="h5">
                            {appointments.length}
                          </Typography>
                        </Link>
                        <Typography variant="body2" component="p">
                          Total Appointment
                        </Typography>
                      </div>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4} lg={4} sx={{ display: "flex" }}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography color="text.primary" variant="h5">
                      Patients
                    </Typography>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
                      <div>
                        <Link
                          component="button"
                          onClick={() => {
                            navigate("/patients");
                          }}
                          sx={{ textDecoration: "none" }}
                        >
                          <Typography variant="h5" component="h5">
                            {patients.length}
                          </Typography>
                        </Link>
                        <Typography variant="body2" component="p">
                          Today's Patients
                        </Typography>
                      </div>
                      <div>
                        <Link
                          component="button"
                          onClick={() => {
                            navigate("/patients");
                          }}
                          sx={{ textDecoration: "none" }}
                        >
                          <Typography variant="h5" component="h5">
                            {patients.length}
                          </Typography>
                        </Link>
                        <Typography variant="body2" component="p">
                          Total Patients
                        </Typography>
                      </div>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4} lg={4} sx={{ display: "flex" }}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography color="text.primary" variant="h5">
                      Doctors
                    </Typography>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
                      <div>
                        <Link
                          component="button"
                          onClick={() => {
                            navigate("/doctors");
                          }}
                          sx={{ textDecoration: "none" }}
                        >
                          <Typography variant="h5" component="h5">
                            {doctors.length}
                          </Typography>
                        </Link>
                        <Typography variant="body2" component="p">
                          Total Earnings
                        </Typography>
                      </div>
                      <div>
                        <Link
                          component="button"
                          onClick={() => {
                            navigate("/doctors");
                          }}
                          sx={{ textDecoration: "none" }}
                        >
                          <Typography variant="h5" component="h5">
                            {doctors.length}
                          </Typography>
                        </Link>
                        <Typography variant="body2" component="p">
                          Total Doctors
                        </Typography>
                      </div>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <AppointmentsForm />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 0, mb: 0 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
