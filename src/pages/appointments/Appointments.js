import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  // useNavigate
} from "react-router-dom";

//mui
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Breadcrumb from "../../components/Breadcrumb";
import Modal from "../../components/Modal";
import Notification from "../../components/Notification";
import DataTable from "../../components/DataTable";

import { setMessage } from "../../slices/message";
import {
  deleteAppointment,
  fetchAppointments,
} from "../../slices/appointmentSlice";
import AppointmentsForm from "../../common/AppointmentsForm";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function Appointments() {
  dayjs.extend(relativeTime);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { doctors, loading } = useSelector((state) => state.doctors);
  const { patients, loading: loadPatients } = useSelector(
    (state) => state.patients
  );
  const { appointments, loading: loadingAppoint } = useSelector(
    (state) => state.appointments
  );
  const { message } = useSelector((state) => state.message);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  function getDoctorName(id) {
    if (doctors.length > 0) {
      const dName = doctors.filter((d) => d.id === +id);
      return dName[0]?.name;
    }
    return id;
  }

  function getPatientName(id) {
    if (patients.length > 0) {
      const dName = patients.filter((d) => d.id === +id);
      return dName[0]?.name;
    }
    return id;
  }
  const columns = [
    {
      field: "patient_id",
      headerName: "Patient Name",
      width: 130,
      valueGetter: ({ value }) => getPatientName(value),
    },
    {
      field: "doctor_id",
      headerName: "Doctor Name",
      width: 160,
      valueGetter: ({ value }) => getDoctorName(value),
    },
    {
      field: "appointment_date",
      headerName: "Appointment Date",
      type: "string",
      width: 160,
      // valueGetter: ({ value }) => value && new Date(value),
      valueGetter: ({ value }) => value && dayjs(value).fromNow(),
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 220,
    },
    {
      field: "actions",
      headerName: 'Action',
      type: "actions",
      width: 180,
      getActions: (params) => [
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <EditIcon
            onClick={() => editPHandler(params.row)}
            sx={{ cursor: "pointer" }}
          />
          <DeleteIcon
            onClick={() => deletePHandler(params.id)}
            sx={{ cursor: "pointer" }}
          />
        </Stack>,
      ],
    },
  ];

  // let navigate = useNavigate();
  const dispatch = useDispatch();

  //snack bar
  const [snackState, setSnackState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const fetchData = useCallback(async () => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const deletePHandler = useCallback(
    async (id) => {
      dispatch(deleteAppointment({ id: id }));
    },
    [dispatch]
  );
  const editPHandler = useCallback(
    async (params) => {
      setEditData(params);
      setEdit(true);
      setOpenModal(true);
    },
    [dispatch]
  );

  useEffect(() => {
    if (appointments.length === 0) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    if (message) {
      setOpenModal(false);
      setSnackState((prevState) => {
        return { ...prevState, open: true };
      });
      setInterval(() => {
        dispatch(setMessage(null));
      }, 1000);
    }
  }, [message]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // if (loading) return <p>Loading...</p>;

  //modal close/open
  const handleClickOpen = () => {
    setEdit(false);
    setEditData(null);
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
            <Breadcrumb link={"/home"} name={"Appointments"} />
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => handleClickOpen()}
              >
                Add
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Modal
              title={edit ? "Edit Appointment" : "New Appointment"}
              handleClose={handleClose}
              open={openModal}
            >
              <AppointmentsForm
                edit={edit}
                editData={editData}
                showHeader={false}
              />
            </Modal>
            <DataTable rows={appointments} columns={columns} />
            {/* <AllPatients patients={patients} /> */}
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
