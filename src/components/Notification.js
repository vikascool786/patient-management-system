import React from "react";
//mui
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Notification({snackState, setSnackState, handleSnackClose, width, message, severity }) {
  const { vertical, horizontal, open } = snackState;

  return (
    <Box sx={{ width: width }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={() => handleSnackClose(setSnackState({ ...snackState, open: false }))}
      >
        <Alert
          onClose={() => handleSnackClose(setSnackState({ ...snackState, open: false }))}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
