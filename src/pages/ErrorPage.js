import { useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const primary = blue[500];
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: primary,
        flexDirection: 'column',
        padding: 0,
        margin: 0
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        Oops!
      </Typography>
      <Typography variant="p" style={{ color: "white" }}>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="p" style={{ color: "white" }}>
        {error.statusText || error.message}
      </Typography>
    </Box>
  );
}
