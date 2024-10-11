import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import patientService from "../../services/patient.service";
import MedicalRecordForm from "../../common/MedicalRecordForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//mui
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import {
  Stack,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Box,
  Typography,
  Chip,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DraftsIcon from "@mui/icons-material/Drafts";

import PatientsForm from "../../common/PatientsForm";
import Breadcrumb from "../../components/Breadcrumb";
import Modal from "../../components/Modal";
import Notification from "../../components/Notification";
import { fetchPatients } from "../../slices/patientSlice";
import { setMessage } from "../../slices/message";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ my: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && "page"}
      icon={props.icon}
      iconPosition="start"
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

export default function PatientDetails() {
  dayjs.extend(relativeTime);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { patients, loading } = useSelector((state) => state.patients);
  const [pHistory, setPHistory] = useState(null);
  const { message } = useSelector((state) => state.message);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tabValue, setTabValue] = React.useState(0);
  //snack bar
  const [snackState, setSnackState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const dispatch = useDispatch();
  let { id: PId } = useParams();

  const handleChange = (event, newValue) => {
    if (
      event.type !== "click" ||
      (event.type === "click" && samePageLinkNavigation(event))
    ) {
      setTabValue(newValue);
    }
  };

  const fetchData = useCallback(async () => {
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    if (patients.length === 0) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    if (message) {
      setOpenModal(false);
      // setSnackState({ ...snackState, open: true });
      setSnackState((prevState) => {
        return { ...prevState, open: true };
      });
      setInterval(() => {
        dispatch(setMessage(null));
      }, 1000);
    }
  }, [message]);

  async function getPatientByHistory(id) {
    try {
      const response = await patientService.getPatientHistoryById(id);
      console.log(response.data.data);
      setPHistory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (PId) {
      getPatientByHistory(PId);
    }
  }, [PId]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // if (loading) return <p>Loading...</p>;

  //modal close/open
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setEdit(false);
    setEditData(null);
  };

  //snack bar close
  const handleSnackClose = () => {
    setSnackState({ ...snackState, open: false });
  };
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
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Breadcrumb link={"/home"} name={"Patient Detail"} />
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  aria-label="nav tabs example"
                  role="navigation"
                >
                  <LinkTab
                    label="Profile"
                    {...a11yProps(0)}
                    icon={<PersonOutlineOutlinedIcon />}
                  />
                  <LinkTab
                    label="Medical Records"
                    {...a11yProps(1)}
                    icon={<MedicalServicesOutlinedIcon />}
                  />
                  <LinkTab
                    label="Appointments"
                    {...a11yProps(2)}
                    icon={<BookOnlineOutlinedIcon />}
                  />
                </Tabs>
                <Divider />
                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Stack
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Chip
                              label="primary"
                              color="primary"
                              size="small"
                            />
                          </Stack>
                          <Stack
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              textAlign: "center",
                              mt: 1,
                            }}
                          >
                            <Avatar
                              alt="Remy Sharp"
                              src="https://mui.com/static/images/avatar/1.jpg"
                            />
                            <Stack sx={{ mt: 2, mb: 2 }}>
                              <Typography component="h6" variant="h6">
                                {pHistory && pHistory[0].name}
                              </Typography>
                              {/* <Typography component={"p"}>
                                description
                              </Typography> */}
                            </Stack>
                          </Stack>
                          <Divider />
                          <Stack
                            direction="row"
                            divider={
                              <Divider orientation="vertical" flexItem />
                            }
                            spacing={2}
                            mt={2}
                            mb={2}
                            textAlign={"center"}
                            justifyContent={"center"}
                          >
                            <Box>
                              <Typography component="h6" variant="h6">
                                {pHistory && pHistory[0].appointments?.length}
                              </Typography>
                              <Typography component={"p"}>
                                Total Appointments
                              </Typography>
                            </Box>
                            <Box>
                              <Typography component="h6" variant="h6">
                                {pHistory &&
                                  pHistory[0].medical_records?.length}
                              </Typography>
                              <Typography component={"p"}>
                                Medical Records
                              </Typography>
                            </Box>
                          </Stack>
                          <Divider />

                          <List
                            component="nav"
                            aria-label="main mailbox folders"
                          >
                            <ListItemButton>
                              <ListItemIcon>
                                <DraftsIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={pHistory && pHistory[0].email}
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              />
                            </ListItemButton>
                            <ListItemButton>
                              <ListItemIcon>
                                <DraftsIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={pHistory && pHistory[0].phone}
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              />
                            </ListItemButton>
                            <ListItemButton>
                              <ListItemIcon>
                                <DraftsIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={pHistory && pHistory[0].address}
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              />
                            </ListItemButton>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                         <MedicalRecordForm />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Appointment Date</TableCell>
                              <TableCell align="right">diagnosis</TableCell>
                              <TableCell align="right">prescription</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pHistory &&
                              pHistory[0].medical_records.map((app, index) => (
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    <Typography
                                      component="h6"
                                      variant="h6"
                                      gutterBottom
                                    >
                                      {dayjs(app.appointment_date).fromNow()}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Chip
                                      label={app.diagnosis}
                                      color="primary"
                                      variant="outlined"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell align="right">
                                    {app.prescription}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Appointment Date</TableCell>
                              <TableCell align="right">Reason</TableCell>
                              <TableCell align="right">Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pHistory &&
                              pHistory[0].appointments.map((app, index) => (
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    <Typography
                                      component="h6"
                                      variant="h6"
                                      gutterBottom
                                    >
                                      {dayjs(app.appointment_date).fromNow()}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Chip
                                      label={app.reason}
                                      color="primary"
                                      variant="outlined"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell align="right">
                                    <Chip
                                      label={app.status}
                                      color="warning"
                                      size="small"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </TabPanel>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {message && (
          <Notification
            snackState={snackState}
            setSnackState={setSnackState}
            handleSnackClose={handleSnackClose}
            width={500}
            message={message}
            severity="success"
          />
        )}
      </Container>
    </Box>
  );
}
