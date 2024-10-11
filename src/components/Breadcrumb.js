import * as React from "react";

//mui
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({ link, name }) {
  let navigate = useNavigate();
  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2}}>
        <Link underline="hover" color="inherit" component="button" onClick={() => navigate(link)}>
          Home
        </Link>
        <Typography color="text.primary">{name}</Typography>
      </Breadcrumbs>
    </React.Fragment>
  );
}
