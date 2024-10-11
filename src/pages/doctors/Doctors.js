import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  // useNavigate
} from "react-router-dom";

//mui
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

import DoctorsForm from "../../common/DoctorsForm";
import Breadcrumb from "../../components/Breadcrumb";
import Modal from "../../components/Modal";
import Notification from "../../components/Notification";
import DataTable from "../../components/DataTable";

import { deleteDoctor, fetchDoctors } from "../../slices/doctorSlice";
import { setMessage } from "../../slices/message";

export default function Doctors() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { doctors, loading } = useSelector((state) => state.doctors);
  const { message } = useSelector((state) => state.message);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Full Name", width: 130 },
    { field: "email", headerName: "Email", width: 160 },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 130,
    },
    {
      field: "specialty",
      headerName: "Specialty",
      width: 160,
    },
    {
      field: "address",
      headerName: "Address",
      width: 160,
    },
    {
      field: "created_at",
      headerName: "Registration Date",
      type: "date",
      width: 130,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "actions",
      // headerName: 'Action',
      type: "actions",
      width: 160,
      getActions: (params) => [
        <Stack direction="row"
          divider={
            <Divider orientation="vertical" flexItem />
          }
          spacing={2}>
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
    dispatch(fetchDoctors());
  }, [dispatch]);

  const deletePHandler = useCallback(
    async (id) => {
      dispatch(deleteDoctor({ id: id }));
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
    if (doctors.length === 0) {
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
            <Breadcrumb link={"/home"} name={"Doctors"} />
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
              title={edit ? "Edit Doctor" : "New Doctor"}
              handleClose={handleClose}
              open={openModal}
            >
              <DoctorsForm edit={edit} editData={editData} />
            </Modal>
            <DataTable rows={doctors} columns={columns} />
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
