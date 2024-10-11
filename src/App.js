import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/patients/Patients";
import PatientDetails from "./pages/patients/PatientDetails";
import ErrorPage from "./pages/ErrorPage";
import { logout } from "./slices/auth";
import EventBus from "./common/EventBus";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Appointments from "./pages/appointments/Appointments";
import Doctors from "./pages/doctors/Doctors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "patients",
        element: <Patients />,
      },
      {
        path: "patients/:id",
        element: <PatientDetails />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
    ],
  },
]);
const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
